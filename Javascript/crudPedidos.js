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
    document.querySelector("#id_produto").value = "";
    document.querySelector("#Data").value = "";
}

// Adicionar informação

document.querySelector("#usuario-form").addEventListener("submit", (e) =>{
    e.preventDefault();

    // Pegar o valor dos formulários
    const Nome = document.querySelector("#Nome").value;
    const id_produto = document.querySelector("#id_produto").value;
    const Data = document.querySelector("#Data").value;

    // Validar campos
    if(Nome == "" || id_produto == "" || Data == ""){
        showAlert("Por favor, preencha os campos.", "danger");
    } else {
        if(selectedRow == null){
            const list = document.querySelector("#lista-usuarios");
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${Nome}</td>
            <td>${id_produto}</td>
            <td>${Data}</td>
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
            selectedRow.children[1].textContent = id_produto;
            selectedRow.children[2].textContent = Data;
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
        document.querySelector("#id_produto").value = selectedRow.children[1].textContent;
        document.querySelector("#Data").value = selectedRow.children[2].textContent;
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