
// fullpagejs start   
var myFullpage = new fullpage('#fullpage', {
    anchors: ['home', '02', '03', '04', '05'],
scrollOverflow: true,
navigation: true,
navigationPosition: 'right',
afterRender: function(){
    addIcons()
}
});

const iconClassList = ['fa fa-home', 'fa-brands fa-codepen', 'fa-solid fa-gamepad'];

const addIcons = () => {
    const fpNav = document.getElementById('fp-nav');
    const fpNavList = fpNav.querySelector('ul');
    const fpNavListİtems = fpNavList.children;

    for( var i = 0; i < fpNavListİtems.length; i++){
        fpNavListİtems[i].children[0].innerHTML = `<i class="${iconClassList[i]}"></i>`;
        //console.log(fpNavListİtems[i]);
    }

}


// fullpagejs end  
