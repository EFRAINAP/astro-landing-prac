<script lang="ts">
	interface FormData {
		name: string;
		email: string;
		framework: string;
		experience: string;
		newsletter: boolean;
		message: string;
	}

	let formData: FormData = $state({
		name: '',
		email: '',
		framework: 'astro',
		experience: 'principiante',
		newsletter: false,
		message: ''
	});

	let isSubmitted = $state(false);
	let errors = $state<Record<string, string>>({});

	function validateForm() {
		errors = {};
		
		if (!formData.name.trim()) {
			errors.name = 'El nombre es obligatorio';
		}
		
		if (!formData.email.trim()) {
			errors.email = 'El email es obligatorio';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			errors.email = 'El email no es válido';
		}
		
		if (formData.message.length < 10) {
			errors.message = 'El mensaje debe tener al menos 10 caracteres';
		}

		return Object.keys(errors).length === 0;
	}

	function handleSubmit(e: Event) {
		e.preventDefault();
		
		if (validateForm()) {
			isSubmitted = true;
			console.log('Datos enviados:', formData);
		}
	}

	function resetForm() {
		formData = {
			name: '',
			email: '',
			framework: 'astro',
			experience: 'principiante',
			newsletter: false,
			message: ''
		};
		isSubmitted = false;
		errors = {};
	}

	// Computed value para mostrar progreso
	const completionPercentage = $derived(() => {
		const fields = [formData.name, formData.email, formData.message];
		const filledFields = fields.filter(field => field.trim() !== '').length;
		return Math.round((filledFields / fields.length) * 100);
	});
</script>

<div class="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
	<h2 class="text-2xl font-bold text-gray-800 mb-4">📝 Formulario de Aprendizaje</h2>
	
	<!-- Barra de progreso -->
	<div class="mb-6">
		<div class="flex justify-between text-sm text-gray-600 mb-1">
			<span>Progreso del formulario</span>
			<span>{completionPercentage}%</span>
		</div>
		<div class="w-full bg-gray-300 rounded-full h-2">
			<div 
				class="bg-green-500 h-2 rounded-full transition-all duration-300"
				style="width: {completionPercentage}%"
			></div>
		</div>
	</div>

	{#if isSubmitted}
		<!-- Estado de éxito -->
		<div class="text-center py-8">
			<div class="text-6xl mb-4">🎉</div>
			<h3 class="text-xl font-bold text-green-600 mb-2">¡Formulario enviado!</h3>
			<p class="text-gray-600 mb-4">Gracias {formData.name}, hemos recibido tu información.</p>
			<button 
				onclick={resetForm}
				class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
			>
				Enviar otro formulario
			</button>
		</div>
	{:else}
		<!-- Formulario -->
		<form onsubmit={handleSubmit} class="space-y-4">
			<!-- Nombre -->
			<div>
				<label for="name" class="block text-sm font-medium text-gray-700 mb-1">
					Nombre
				</label>
				<input 
					id="name"
					bind:value={formData.name}
					type="text"
					class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 {errors.name ? 'border-red-500' : ''}"
					placeholder="Tu nombre"
				>
				{#if errors.name}
					<p class="text-red-500 text-xs mt-1">{errors.name}</p>
				{/if}
			</div>

			<!-- Email -->
			<div>
				<label for="email" class="block text-sm font-medium text-gray-700 mb-1">
					Email
				</label>
				<input 
					id="email"
					bind:value={formData.email}
					type="email"
					class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 {errors.email ? 'border-red-500' : ''}"
					placeholder="tu@email.com"
				>
				{#if errors.email}
					<p class="text-red-500 text-xs mt-1">{errors.email}</p>
				{/if}
			</div>

			<!-- Framework favorito -->
			<div>
				<label for="framework" class="block text-sm font-medium text-gray-700 mb-1">
					Framework favorito
				</label>
				<select 
					id="framework"
					bind:value={formData.framework}
					class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value="astro">Astro</option>
					<option value="svelte">Svelte</option>
					<option value="react">React</option>
					<option value="vue">Vue</option>
					<option value="angular">Angular</option>
				</select>
			</div>

			<!-- Nivel de experiencia -->
			<div>
				<label for="experience" class="block text-sm font-medium text-gray-700 mb-2">
					Nivel de experiencia
				</label>
				<div class="space-x-4">
					<label class="inline-flex items-center">
						<input 
							id="experience"
							bind:group={formData.experience}
							type="radio" 
							value="principiante"
							class="text-blue-500 focus:ring-blue-500"
						>
						<span class="ml-2 text-sm">Principiante</span>
					</label>
					<label class="inline-flex items-center">
						<input 
							bind:group={formData.experience}
							type="radio" 
							value="intermedio"
							class="text-blue-500 focus:ring-blue-500"
						>
						<span class="ml-2 text-sm">Intermedio</span>
					</label>
					<label class="inline-flex items-center">
						<input 
							bind:group={formData.experience}
							type="radio" 
							value="avanzado"
							class="text-blue-500 focus:ring-blue-500"
						>
						<span class="ml-2 text-sm">Avanzado</span>
					</label>
				</div>
			</div>

			<!-- Newsletter -->
			<div>
				<label class="flex items-center">
					<input 
						bind:checked={formData.newsletter}
						type="checkbox"
						class="text-blue-500 focus:ring-blue-500"
					>
					<span class="ml-2 text-sm">Suscribirse al newsletter</span>
				</label>
			</div>

			<!-- Mensaje -->
			<div>
				<label for="message" class="block text-sm font-medium text-gray-700 mb-1">
					Mensaje
				</label>
				<textarea 
					id="message"
					bind:value={formData.message}
					rows="4"
					class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 {errors.message ? 'border-red-500' : ''}"
					placeholder="Cuéntanos qué quieres aprender..."
				></textarea>
				{#if errors.message}
					<p class="text-red-500 text-xs mt-1">{errors.message}</p>
				{/if}
				<p class="text-xs text-gray-500 mt-1">{formData.message.length} caracteres</p>
			</div>

			<!-- Botón submit -->
			<button 
				type="submit"
				class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors font-semibold"
			>
				Enviar formulario
			</button>
		</form>

		<!-- Vista previa de datos -->
		{#if formData.name || formData.email}
			<div class="mt-6 p-4 bg-gray-50 rounded-lg">
				<h4 class="text-sm font-medium text-gray-700 mb-2">Vista previa:</h4>
				<pre class="text-xs text-gray-600 overflow-x-auto">{JSON.stringify(formData, null, 2)}</pre>
			</div>
		{/if}
	{/if}
</div>