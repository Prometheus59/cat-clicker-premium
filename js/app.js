
// ************ Model ************
var model = {
    currentCat: null,
    cats: [
        {
            name: "Cat1",
            pic: "https://s-media-cache-ak0.pinimg.com/736x/4c/a2/c1/4ca2c1d3ef5042461f5def25e68b2fa5.jpg",
            clickCount: 0
        },
        {
            name: "Cat2",
            pic: "https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496",
            clickCount: 0
        },
        {
            name: "Cat3",
            pic: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZmNMvGoUC5ypAeel-sYr4poKXmO16ykCIgkjI1rkeUaEMLpDF5Q",
            clickCount: 0
        },
        {
            name: "Cat4",
            pic: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT-1_ibjpaTeqpOxtlN0ToWI7kO73oWjq6gcbqXsGMe3i_MZOtl",
            clickCount: 0
        },
        {
            name: "Cat5",
            pic: "https://www.aspca.org/sites/default/files/cat-care_cat-nutrition-tips_overweight_body4_left.jpg",
            clickCount: 0
        }
    ]
};


// *********** Octopus Start **************
// Communication between the Model and the View (seperation of concerns)
var octopus = {
    
    init: function () {
        model.currentCat = model.cats[0];
        
        catListView.init();
        catView.init();
        adminView.init();
    },
    
    getCurrentCat: function () {
        return model.currentCat;
    },
    
    getCats: function () {
        return model.cats;
    },
    
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },
    
    incrementCounter: function () {
        model.currentCat.clickCount++;
        catView.render();
    },
    
    newName: function(name2){
        model.currentCat.name = name2;
        catView.render();
        catListView.render();
    },
    
    newUrl: function(url2){
        model.currentCat.pic = url2;
        catView.render();
        catListView.render();
    },
    
    diffClicks: function(num){
        model.currentCat.clickCount = num;
        catView.render();
    }
};



// ************ View ****************

var catView = {
    init: function() {
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImgElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');
        
        this.catImgElem.addEventListener('click', function (){
            octopus.incrementCounter();
        });
        
        this.render();
        
    },
    
    render: function(){
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImgElem.src = currentCat.pic;
    }
};


var catListView = {
    init: function() {
        this.catListElem = document.getElementById('cat-list');
        
        this.render();
    },
    
    render: function(){
        var cat, elem, i;
        
        var cats = octopus.getCats();
        
        this.catListElem.innerHTML = '';
        
        for (i=0; i < cats.length; i++) {
            cat = cats[i];
            
            elem = document.createElement('li');
            elem.textContent = cat.name;
            
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));
            
            this.catListElem.appendChild(elem);
        }
    }
};

// Allows user to change cat name, url, and number of clicks
var adminView = {
    
    init: function(){
        this.adminPrivileges = document.getElementById("adminBtn");
        
        this.adminPrivileges.addEventListener("click", function(){
            var elem = document.getElementById("hide");
            if (elem.style.display == "none") {
                adminView.view();
            } else {
                adminView.hide();
            }
        });
        
        this.submission = document.getElementById("submit");
        
        this.submission.addEventListener("click", function(){
            var a = document.forms["form"]["name"].value;
            var b = document.forms["form"]["url"].value;
            var c = document.forms["form"]["count"].value;
            
            if (a.length > 0){
                adminView.changeName(a);
                console.log("name changed to " + a)
            }
            if (b.length > 0) {
                adminView.changeUrl(b);
            }
            if (c.length > 0) {
                adminView.changeClicks(c);
            }
        })
    },
    
    // For viewing and hiding administrator priviliges
    view: function(){
        var elem = document.getElementById("hide");
        elem.style.display = "block";
    },
    
    hide: function(){
        var elem = document.getElementById("hide");
        elem.style.display = "none";
    },
    
    changeName: function(name){
        octopus.newName(name);
    },
    
    changeUrl: function(url){
        octopus.newUrl(url);
    },
    
    changeClicks: function(number){
        octopus.diffClicks(number);
    }
};

octopus.init();
