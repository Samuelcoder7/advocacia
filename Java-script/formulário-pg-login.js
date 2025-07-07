// Função para validar o formulário (senhas)
function validarFormulario() {
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
    const erroSenha = document.getElementById("erroSenha");

    if (senha !== confirmarSenha) {
        erroSenha.style.display = "block";
        return false;
    } else {
        erroSenha.style.display = "none";
        return true;
    }
}

// Função para alternar visibilidade das senhas (ícone)
function toggleSenha(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}

// Alternar visibilidade da senha via checkbox
function toggleSenhaCheckbox(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    const checkbox = document.getElementById(
        inputId === "senha" ? "checkboxSenha" : "checkboxConfirmarSenha"
    );
    if (checkbox.checked) {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}

// Formatar e validar CPF (função única)
function formatarEValidarCPF(input) {
    let valor = input.value.replace(/\D/g, '');

    if (valor.length <= 11) {
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        input.value = valor;
    }

    const cpfValido = validarCPF(valor);

    if (!cpfValido) {
        input.setCustomValidity("Por favor, insira um CPF válido.");
        input.reportValidity();
        document.getElementById("erroCPF").style.display = "inline";
    } else {
        input.setCustomValidity("");
        document.getElementById("erroCPF").style.display = "none";
    }
}

// Função de validação do CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += Number(cpf.charAt(i)) * (10 - i);
    let dig1 = 11 - (soma % 11);
    if (dig1 >= 10) dig1 = 0;
    if (dig1 !== Number(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += Number(cpf.charAt(i)) * (11 - i);
    let dig2 = 11 - (soma % 11);
    if (dig2 >= 10) dig2 = 0;
    if (dig2 !== Number(cpf.charAt(10))) return false;

    return true;
}

// Validação de telefone com máscara
function validarTelefone() {
    const telefoneInput = document.getElementById("telefone");
    const telefone = telefoneInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const erroTelefone = document.getElementById("erroTelefone");

    // Aplica a máscara no telefone
    if (telefone.length <= 10) {
        telefoneInput.value = telefone.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
    } else {
        telefoneInput.value = telefone.replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3");
    }

    // Valida o número de dígitos
    if (telefone.length !== 10 && telefone.length !== 11) {
        if (erroTelefone) erroTelefone.style.display = "inline";
        telefoneInput.setCustomValidity("Telefone inválido. Deve conter 10 ou 11 dígitos.");
        return false;
    } else {
        if (erroTelefone) erroTelefone.style.display = "none";
        telefoneInput.setCustomValidity("");
        return true;
    }
}

// Validação de e-mail
function validaEmail() {
    const email = document.getElementById("email");
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/;

    if (!email.value) {
        alert('Campo e-mail vazio');
        return false;
    } else if (!re.test(email.value)) {
        alert('Email inválido');
        return false;
    }
    return true;
}

// Validação de CEP
function validaCEP(input) {
    
     
    let cep = input.value.replace(/\s+|-/g, "");
    console.log(cep)
    if (cep.length !== 8 || !/^\d{8}$/.test(cep)) {
        input.setCustomValidity("Por favor, insira um CEP válido com 8 números.");
        input.reportValidity();
        return false;
    } else {
        input.setCustomValidity("");
        return true;
    }
}

// Validar tudo no submit do formulário
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registroForm");

    form.addEventListener("submit", function (e) {
        const cpfInput = document.getElementById("cpf");
        const telefoneInput = document.getElementById("telefone");
        const cepInput = document.getElementById("cep");

        formatarEValidarCPF(cpfInput);
        const cpfValido = cpfInput.checkValidity();
        const telefoneValido = validarTelefone();
        const cepValido = validaCEP(cepInput);
        const senhaValida = validarFormulario();
        const emailValido = validaEmail();

        if (!cpfValido || !telefoneValido || !cepValido || !senhaValida || !emailValido) {
            e.preventDefault(); // bloqueia o envio se algum estiver inválido
        }
    });
});
