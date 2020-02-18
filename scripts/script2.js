
window.onload = async function () {
    let gameSelectId = await localStorage.getItem("gameSelectId");
    let gameObject = await queryGameSelect(gameSelectId);
    $("#game_title").html(gameObject.name);
    $("#game_image").attr("src", gameObject.image.medium_url);
    console.log(gameObject.name);
    let releaseDate = await this.localStorage.getItem("release date");
    let Platform = await this.localStorage.getItem("Platform");
    await buildCards(gameObject);
    
    document.getElementsByTagName("html")[0].style.visibility = "visible";
    console.log(releaseDate);
    $("#game_release_date").html(releaseDate);
    $("#platform").html(Platform);
    
    
    

}

async function buildCards(gameObject) {
    let cardContainer = document.getElementById('card-container');
    let news = await newsLookup(gameObject.name);
    await initListOfTasks();

    async function initListOfTasks() {
        cardContainer.innerHTML = "";

        await news.map((paper) => {

            createTaskCard(paper);
        })
        function createTaskCard(paper) {

            let card = document.createElement('div');
            card.className = 'card';
        
           
            let cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            let title = document.createElement('h5');
            title.innerText = paper.title;
            title.className = 'card-title';

            let cardText = document.createElement('p');
            cardText.innerText = paper.description;
            cardText.className = 'card-text';
            let cardText2 = document.createElement('p')
            cardText2.innerText = "View Article";
            cardText2.className = 'card-text';

            cardText2.addEventListener("click", async function(event) {
                event.preventDefault();
                window.location.href=paper.url;
                
            });
    
            

            card.appendChild(title);
            cardBody.appendChild(cardText)
            cardBody.appendChild(cardText2)
            card.appendChild(cardBody);
            

            
            cardContainer.appendChild(card);
            
            
        }
        
        
    }
}



async function newsLookup(gameName) {

    
    let newObject = [];
    let apiUrl = await `http://newsapi.org/v2/everything?qInTitle=\"${gameName}\"&from=2020-01-30&sortBy=publishedAt&domains=gamespot.com,ign.com,androidcentral.com,comicbook.com,siliconera.com,playstationlifestyle.net,vgchartz.com,imore.com,windowscentral.com&apiKey=0ab09aaa807c43ef9016db62cfa6304d&language=en`;
    const response = await get(apiUrl);

    try {
        

        await response.articles.map(function(element, i) {
         if (i < 5) {
             newObject.push(element);
         }
            
        })
        console.log(newObject[0].description);
        console.log(newObject[0].url);
        //article title = news[0].title
        // article description = news[0].description
        // newObject[0].url
        return await newObject;

    }

    catch (error) {
        return [];
    }

}




