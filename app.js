addEventListener('DOMContentLoaded', ()=> {
    const btn_menu = document.querySelector('.btn_menu')
    if (btn_menu){
        btn_menu.addEventListener('click', () =>{
            const menu_items =document.querySelector('.menu_items')
            menu_items.classList.toggle('show')
        });
    }
});

// scrip de barra de desplazamiento

document.querySelectorAll("#temario .lista a").forEach((elemento) => {
	elemento.addEventListener("click", () => {
		document.querySelector("#temario .activo").classList.remove("activo");
        elemento.parentElement.classList.add('activo');
	});
});
