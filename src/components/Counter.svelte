<script lang="ts">
	let count = $state(0);

	function increment() {
		count++;
	}

	function decrement() {
		count--;
	}

	function reset() {
		count = 0;
	}

	// Computed value para mostrar el nivel
	const level = $derived(
		count <= 0 ? 'Principiante 🟢' :
		count <= 5 ? 'Intermedio 🟡' :
		count <= 10 ? 'Avanzado 🟠' : 
		'¡Experto! 🔥'
	);

	// Estilo dinámico basado en el contador
	const buttonColor = $derived(
		count < 0 ? 'bg-red-500 hover:bg-red-600' :
		count < 5 ? 'bg-blue-500 hover:bg-blue-600' :
		count < 10 ? 'bg-purple-500 hover:bg-purple-600' :
		'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600'
	);
</script>

<div class="bg-white rounded-lg shadow-md p-6 max-w-sm mx-auto">
	<h3 class="text-xl font-bold text-gray-800 mb-4 text-center">⚡ Contador Interactivo</h3>
	
	<div class="text-center mb-4">
		<div class="text-6xl font-bold text-gray-800 mb-2">
			{count}
		</div>
		<div class="text-sm text-gray-600 mb-4">
			{level}
		</div>
		
		<div class="flex gap-2 justify-center">
			<button 
				onclick={decrement}
				class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
			>
				➖
			</button>
			
			<button 
				onclick={increment}
				class="{buttonColor} text-white px-6 py-2 rounded-lg transition-all duration-300 font-semibold transform hover:scale-105"
			>
				➕ Subir
			</button>
			
			<button 
				onclick={reset}
				class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
			>
				🔄
			</button>
		</div>
	</div>
</div>