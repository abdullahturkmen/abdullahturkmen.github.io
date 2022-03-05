
// fullpagejs start   
var myFullpage = new fullpage('#fullpage', {
   
scrollOverflow: true,
navigation: true,
navigationPosition: 'right',
afterRender: function(){
    //addIcons()
}
});

const iconClassList = ['fa fa-home', 'fa-brands fa-codepen', 'fa-solid fa-gamepad', 'fa-regular fa-address-card'];

const addIcons = () => {
    const fpNav = document.getElementById('fp-nav');
    const fpNavList = fpNav.querySelector('ul');
    const fpNavListİtems = fpNavList.children;

    for( var i = 0; i < fpNavListİtems.length; i++){
        let iconClass = iconClassList[i];
        if(!iconClassList[i]){
            iconClass = 'fa-solid fa-circle';
        }
        fpNavListİtems[i].children[0].innerHTML = `<i class="${iconClass}"></i>`;
    }

}


// fullpagejs end  
