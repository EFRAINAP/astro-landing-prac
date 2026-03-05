<script lang="ts">
	interface Todo {
		id: number;
		text: string;
		completed: boolean;
	}

	let newTodoText = $state('');
	let todos: Todo[] = $state([
		{ id: 1, text: 'Aprender Astro', completed: false },
		{ id: 2, text: 'Crear componentes Svelte', completed: false },
		{ id: 3, text: 'Estilizar con Tailwind', completed: true }
	]);

	function addTodo() {
		if (newTodoText.trim()) {
			todos.push({
				id: Date.now(),
				text: newTodoText.trim(),
				completed: false
			});
			newTodoText = '';
		}
	}

	function toggleTodo(id: number) {
		const todo = todos.find(t => t.id === id);
		if (todo) {
			todo.completed = !todo.completed;
		}
	}

	function deleteTodo(id: number) {
		todos = todos.filter(t => t.id !== id);
	}

	// Computed values usando derivados
	const completedCount = $derived(todos.filter(t => t.completed).length);
	const totalCount = $derived(todos.length);
</script>

<div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
	<h2 class="text-2xl font-bold text-gray-800 mb-4">🎯 Lista de Aprendizaje</h2>
	
	<!-- Input para nuevo todo -->
	<div class="flex gap-2 mb-4">
		<input 
			bind:value={newTodoText}
			onkeydown={(e) => e.key === 'Enter' && addTodo()}
			placeholder="¿Qué quieres aprender?"
			class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
		>
		<button 
			onclick={addTodo}
			class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
		>
			➕
		</button>
	</div>

	<!-- Lista de todos -->
	<div class="space-y-2">
		{#each todos as todo (todo.id)}
			<div class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
				<input 
					type="checkbox" 
					checked={todo.completed}
					onchange={() => toggleTodo(todo.id)}
					class="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
				>
				<span class="flex-1 {todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}">
					{todo.text}
				</span>
				<button 
					onclick={() => deleteTodo(todo.id)}
					class="text-red-500 hover:text-red-700 transition-colors"
				>
					🗑️
				</button>
			</div>
		{/each}
	</div>

	<!-- Estadísticas -->
	<div class="mt-4 p-3 bg-gray-100 rounded-lg">
		<p class="text-sm text-gray-600">
			Progreso: {completedCount} de {totalCount} completados
		</p>
		<div class="w-full bg-gray-300 rounded-full h-2 mt-2">
			<div 
				class="bg-blue-500 h-2 rounded-full transition-all duration-300" 
				style="width: {totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%"
			></div>
		</div>
	</div>
</div>