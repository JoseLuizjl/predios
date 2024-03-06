$(document).ready(function() {
    // Faz a requisição Ajax para a API
    $.ajax({
        url: 'http://localhost:8080/predios', // Substitua pela URL da sua API
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            // Limpa a lista de prédios
            $('#predios-list').empty();
            
            // Itera sobre os prédios e os adiciona à lista
            data.forEach(function(predio) {
                $('#predios-list').append('<li>' + predio.nomePredio + ' - ' + predio.cidade + '</li>');
            });
        },
        error: function(xhr, status, error) {
            // Em caso de erro, exibe uma mensagem de erro na console do navegador
            console.error('Erro ao buscar prédios:', error);
        }
    });
});