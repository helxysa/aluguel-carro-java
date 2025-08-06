const API_BASE_URL = 'http://localhost:8080/api/carros';
const ALUGUEL_API_URL = 'http://localhost:8080/api/alugueis';

let editingCarId = null;
let currentTab = 'carros';

const carForm = document.getElementById('carForm');
const aluguelForm = document.getElementById('aluguelForm');
const carsList = document.getElementById('carsList');
const activeRentalsList = document.getElementById('activeRentalsList');
const allRentalsList = document.getElementById('allRentalsList');
const carroSelect = document.getElementById('carroSelect');
const loading = document.getElementById('loading');
const message = document.getElementById('message');
const messageText = document.getElementById('messageText');
const cancelEditBtn = document.getElementById('cancelEdit');

document.addEventListener('DOMContentLoaded', function() {
    showTab('carros');
    loadCars();
    
    setTimeout(() => {
        loadAvailableCars();
    }, 100);
    
    carForm.addEventListener('submit', handleCarSubmit);
    aluguelForm.addEventListener('submit', handleRentalSubmit);
    cancelEditBtn.addEventListener('click', cancelEdit);
    
    document.getElementById('dataInicio').addEventListener('change', calculateEstimatedValue);
    document.getElementById('dataFim').addEventListener('change', calculateEstimatedValue);
    document.getElementById('carroSelect').addEventListener('change', calculateEstimatedValue);
});

function showTab(tabName) {
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.getElementById('tab' + tabName.charAt(0).toUpperCase() + tabName.slice(1)).classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(tabName + 'Tab').classList.add('active');
    
    currentTab = tabName;
    
    if (tabName === 'carros') {
        loadCars();
    } else if (tabName === 'alugueis') {
        setTimeout(() => {
            loadActiveRentals();
            loadAllRentals();
            loadAvailableCars();
        }, 50);
    }
}

async function loadCars() {
    showLoading();
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error('Erro ao carregar carros');
        
        const cars = await response.json();
        displayCars(cars);
    } catch (error) {
        showMessage('Erro ao carregar carros: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

function displayCars(cars) {
    if (cars.length === 0) {
        carsList.innerHTML = `
            <div class="px-6 py-12 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6 0a1 1 0 001 1h4a1 1 0 001-1m-6 0V9a1 1 0 011-1h2a1 1 0 011 1v7m-6 0a1 1 0 001 1h4a1 1 0 001-1V9a1 1 0 00-1-1h-2a1 1 0 00-1 1v7z"></path>
                </svg>
                <h3 class="mt-4 text-sm font-medium text-gray-900">Nenhum carro cadastrado</h3>
                <p class="mt-2 text-sm text-gray-500">Adicione o primeiro carro usando o formulário acima</p>
            </div>
        `;
        return;
    }

    carsList.innerHTML = cars.map(car => `
        <div class="item-row px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="flex-1">
                    <div class="flex items-center space-x-4">
                        <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6 0a1 1 0 001 1h4a1 1 0 001-1m-6 0V9a1 1 0 011-1h2a1 1 0 011 1v7m-6 0a1 1 0 001 1h4a1 1 0 001-1V9a1 1 0 00-1-1h-2a1 1 0 00-1 1v7z"></path>
                            </svg>
                        </div>
                        <div>
                            <h3 class="font-medium text-gray-900">${car.modelo}</h3>
                            <div class="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                                <span>R$ ${parseFloat(car.valor).toLocaleString('pt-BR', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}</span>
                                <span class="status-badge ${car.disponivel ? 'status-available' : 'status-unavailable'}">
                                    ${car.disponivel ? 'Disponível' : 'Alugado'}
                                </span>
                                <span class="text-xs">
                                    R$ ${(car.valor * 0.005).toLocaleString('pt-BR', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}/dia
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="editCar(${car.id})" 
                            class="btn-secondary px-3 py-1.5 rounded-md text-xs font-medium">
                        Editar
                    </button>
                    <button onclick="deleteCar(${car.id})" 
                            class="btn-destructive px-3 py-1.5 rounded-md text-xs font-medium">
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

async function handleCarSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(carForm);
    const carData = {
        modelo: formData.get('modelo'),
        valor: parseFloat(formData.get('valor')),
        disponivel: formData.get('disponivel') === 'true'
    };

    showLoading();
    
    try {
        let response;
        if (editingCarId) {
            response = await fetch(`${API_BASE_URL}/${editingCarId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(carData)
            });
        } else {
            response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(carData)
            });
        }

        if (!response.ok) throw new Error('Erro ao salvar carro');

        showMessage(editingCarId ? 'Carro atualizado com sucesso!' : 'Carro adicionado com sucesso!', 'success');
        carForm.reset();
        cancelEdit();
        loadCars();
        loadAvailableCars();
    } catch (error) {
        showMessage('Erro ao salvar carro: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

async function editCar(id) {
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) throw new Error('Erro ao carregar dados do carro');
        
        const car = await response.json();
        
        document.getElementById('modelo').value = car.modelo;
        document.getElementById('valor').value = car.valor;
        document.getElementById('disponivel').value = car.disponivel.toString();
        
        editingCarId = id;
        cancelEditBtn.classList.remove('hidden');
        document.querySelector('#carForm button[type="submit"]').textContent = 'Atualizar Carro';
        
        showTab('carros');
        document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        showMessage('Erro ao carregar dados do carro: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

function cancelEdit() {
    editingCarId = null;
    carForm.reset();
    cancelEditBtn.classList.add('hidden');
    document.querySelector('#carForm button[type="submit"]').textContent = 'Adicionar Carro';
}

async function deleteCar(id) {
    if (!confirm('Tem certeza que deseja excluir este carro?')) return;
    
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Erro ao excluir carro');
        
        showMessage('Carro excluído com sucesso!', 'success');
        loadCars();
        loadAvailableCars();
    } catch (error) {
        showMessage('Erro ao excluir carro: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

async function loadAvailableCars() {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error('Erro ao carregar carros');
        
        const cars = await response.json();
        const availableCars = cars.filter(car => car.disponivel);
        
        if (!carroSelect) {
            return;
        }
        
        if (availableCars.length === 0) {
            carroSelect.innerHTML = '<option value="">Nenhum carro disponível</option>';
        } else {
            carroSelect.innerHTML = '<option value="">Selecione um carro...</option>' + 
                availableCars.map(car => `
                    <option value="${car.id}" data-valor="${car.valor}">
                        ${car.modelo} - R$ ${parseFloat(car.valor).toLocaleString('pt-BR')} 
                        (R$ ${(car.valor * 0.005).toLocaleString('pt-BR', {minimumFractionDigits: 2})}/dia)
                    </option>
                `).join('');
        }
    } catch (error) {
        if (carroSelect) {
            carroSelect.innerHTML = '<option value="">Erro ao carregar carros</option>';
        }
    }
}

function calculateEstimatedValue() {
    const carroId = document.getElementById('carroSelect').value;
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;
    
    if (carroId && dataInicio && dataFim) {
        const selectedOption = document.querySelector(`#carroSelect option[value="${carroId}"]`);
        const valorCarro = parseFloat(selectedOption.getAttribute('data-valor'));
        
        const inicio = new Date(dataInicio);
        const fim = new Date(dataFim);
        const dias = Math.ceil((fim - inicio) / (1000 * 60 * 60 * 24)) + 1;
        
        if (dias > 0) {
            const valorPorDia = valorCarro * 0.005;
            const valorTotal = dias * valorPorDia;
            
            document.getElementById('valorEstimado').textContent = 
                `R$ ${valorTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})} (${dias} dias × R$ ${valorPorDia.toLocaleString('pt-BR', {minimumFractionDigits: 2})})`;
            document.getElementById('valorCalculado').classList.remove('hidden');
        } else {
            document.getElementById('valorCalculado').classList.add('hidden');
        }
    } else {
        document.getElementById('valorCalculado').classList.add('hidden');
    }
}

async function handleRentalSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(aluguelForm);
    const params = new URLSearchParams({
        carroId: formData.get('carroId'),
        nomeCliente: formData.get('nomeCliente'),
        dataInicio: formData.get('dataInicio'),
        dataFim: formData.get('dataFim')
    });

    showLoading();
    
    try {
        const response = await fetch(`${ALUGUEL_API_URL}/alugar?${params}`, {
            method: 'POST'
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Erro ao alugar carro');
        }

        showMessage('Carro alugado com sucesso!', 'success');
        aluguelForm.reset();
        document.getElementById('valorCalculado').classList.add('hidden');
        loadActiveRentals();
        loadAllRentals();
        loadAvailableCars();
        loadCars();
    } catch (error) {
        showMessage('Erro ao alugar carro: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

async function loadActiveRentals() {
    try {
        const response = await fetch(`${ALUGUEL_API_URL}/ativos`);
        if (!response.ok) throw new Error('Erro ao carregar aluguéis ativos');
        
        const rentals = await response.json();
        displayActiveRentals(rentals);
    } catch (error) {
        showMessage('Erro ao carregar aluguéis ativos: ' + error.message, 'error');
    }
}

function displayActiveRentals(rentals) {
    if (rentals.length === 0) {
        activeRentalsList.innerHTML = `
            <div class="px-6 py-12 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <h3 class="mt-4 text-sm font-medium text-gray-900">Nenhum aluguel ativo</h3>
                <p class="mt-2 text-sm text-gray-500">Contratos em andamento aparecerão aqui</p>
            </div>
        `;
        return;
    }

    activeRentalsList.innerHTML = rentals.map(rental => `
        <div class="item-row px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="flex-1">
                    <div class="flex items-center space-x-4">
                        <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </div>
                        <div>
                            <h3 class="font-medium text-gray-900">${rental.nomeCliente}</h3>
                            <p class="text-sm text-gray-500">${rental.carro.modelo} • ${formatDate(rental.dataInicio)} - ${formatDate(rental.dataFim)}</p>
                        </div>
                    </div>
                </div>
                <div class="flex items-center space-x-3">
                    <span class="status-badge status-active">Ativo</span>
                    <span class="text-sm font-medium text-gray-900">R$ ${parseFloat(rental.valorTotal).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                    <button onclick="finishRental(${rental.id})" 
                            class="btn-destructive px-3 py-1.5 rounded-md text-xs font-medium">
                        Finalizar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

async function loadAllRentals() {
    try {
        const response = await fetch(ALUGUEL_API_URL);
        if (!response.ok) throw new Error('Erro ao carregar histórico de aluguéis');
        
        const rentals = await response.json();
        displayAllRentals(rentals);
    } catch (error) {
        showMessage('Erro ao carregar histórico: ' + error.message, 'error');
    }
}

function displayAllRentals(rentals) {
    if (rentals.length === 0) {
        allRentalsList.innerHTML = `
            <div class="px-6 py-12 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <h3 class="mt-4 text-sm font-medium text-gray-900">Nenhum aluguel encontrado</h3>
                <p class="mt-2 text-sm text-gray-500">Comece criando um novo aluguel</p>
            </div>
        `;
        return;
    }

    allRentalsList.innerHTML = rentals.map(rental => `
        <div class="item-row px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="flex-1">
                    <div class="flex items-center space-x-4">
                        <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </div>
                        <div>
                            <h3 class="font-medium text-gray-900">${rental.nomeCliente}</h3>
                            <p class="text-sm text-gray-500">${rental.carro.modelo} • ${formatDate(rental.dataInicio)} - ${formatDate(rental.dataFim)}</p>
                            <div class="mt-1">
                                <span class="status-badge ${rental.ativo ? 'status-active' : 'bg-gray-100 text-gray-600 border border-gray-200'}">
                                    ${rental.ativo ? 'Ativo' : 'Finalizado'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex items-center space-x-3">
                    <span class="text-sm font-medium text-gray-900">R$ ${parseFloat(rental.valorTotal).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                    <div class="flex items-center space-x-2">
                        ${rental.ativo ? `
                            <button onclick="finishRental(${rental.id})" 
                                    class="btn-secondary px-3 py-1.5 rounded-md text-xs font-medium">
                                Finalizar
                            </button>
                        ` : ''}
                        <button onclick="deleteRental(${rental.id})" 
                                class="btn-destructive px-3 py-1.5 rounded-md text-xs font-medium">
                            Excluir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

async function finishRental(id) {
    if (!confirm('Tem certeza que deseja finalizar este aluguel?')) return;
    
    showLoading();
    try {
        const response = await fetch(`${ALUGUEL_API_URL}/finalizar/${id}`, { method: 'PUT' });
        if (!response.ok) throw new Error('Erro ao finalizar aluguel');
        
        showMessage('Aluguel finalizado com sucesso!', 'success');
        loadActiveRentals();
        loadAllRentals();
        loadAvailableCars();
        loadCars();
    } catch (error) {
        showMessage('Erro ao finalizar aluguel: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

async function deleteRental(id) {
    if (!confirm('Tem certeza que deseja excluir este aluguel?')) return;
    
    showLoading();
    try {
        const response = await fetch(`${ALUGUEL_API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Erro ao excluir aluguel');
        
        showMessage('Aluguel excluído com sucesso!', 'success');
        loadActiveRentals();
        loadAllRentals();
        loadAvailableCars();
        loadCars();
    } catch (error) {
        showMessage('Erro ao excluir aluguel: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('pt-BR');
}

function showLoading() {
    loading.classList.remove('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
}

function showMessage(text, type = 'success') {
    messageText.textContent = text;
    const messageDiv = message.querySelector('div');
    
    if (type === 'error') {
        messageDiv.className = 'bg-red-50 border border-red-200 rounded-lg shadow-lg p-4';
        messageText.className = 'text-red-800 font-medium';
        message.querySelector('button').className = 'text-red-400 hover:text-red-600 ml-4';
    } else {
        messageDiv.className = 'bg-green-50 border border-green-200 rounded-lg shadow-lg p-4';
        messageText.className = 'text-green-800 font-medium';
        message.querySelector('button').className = 'text-green-400 hover:text-green-600 ml-4';
    }
    
    message.classList.remove('hidden');
    setTimeout(hideMessage, 5000);
}

function hideMessage() {
    message.classList.add('hidden');
}