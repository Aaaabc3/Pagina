var selectedRow = null;

// Mensagem de alerta
function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Limpar campos
function clearFields() {
    document.querySelector("#Nome").value = "";
    document.querySelector("#Email").value = "";
    document.querySelector("#Senha").value = "";
}

// Adicionar informação

document.querySelector("#usuario-form").addEventListener("submit", (e) =>{
    e.preventDefault();

    // Pegar o valor dos formulários
    const Nome = document.querySelector("#Nome").value;
    const Email = document.querySelector("#Email").value;
    const Senha = document.querySelector("#Senha").value;

    // Validar campos
    if(Nome == "" || Email == "" || Senha == ""){
        showAlert("Por favor, preencha os campos.", "danger");
    } else if (Senha.lenght < 8 || Senha.lenght > 16) {
        showAlert("A senha deve ter entre 8 a 16 caracteres", "danger")
    } else {
        if(selectedRow == null){
            const list = document.querySelector("#lista-usuarios");
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${Nome}</td>
            <td>${Email}</td>
            <td>${Senha}</td>
            <td>
            <a href="#" class="btn btn-warning btn-sm edit">Edit</a>                       
            <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Usuário adicionado", "success")
        }
        else{
            selectedRow.children[0].textContent = Nome;
            selectedRow.children[1].textContent = Email;
            selectedRow.children[2].textContent = Senha;
            selectedRow = null;
            showAlert("Informação do usuário editada", "info");
        }
        selectedRow = null;
        clearFields();
    }
})

// Edit Data

document.querySelector("#lista-usuarios").addEventListener("click", (e) => {
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#Nome").value = selectedRow.children[0].textContent;
        document.querySelector("#Email").value = selectedRow.children[1].textContent;
        document.querySelector("#Senha").value = selectedRow.children[2].textContent;
    }
});


// Delete data

document.querySelector("#lista-usuarios").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Usuario deletado", "danger");
    }
});