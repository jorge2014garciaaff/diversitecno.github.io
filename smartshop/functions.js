const products = [
    {
        id: 1,
        name: "Notebook Banghó Max L5 16gb 480gb Ssd Intel I7 1255u Sin SO",
        price: 1200000,
        image: "../images/imagenes/Notebook Banghó Max L5 16gb 480gb Ssd Intel I7 1255u Sin So.webp",
        features: "16GB RAM, 480GB SSD, Intel i7 1255u, Sin sistema operativo",
        rating: 4.5,
        reviews: [
            "Excelente rendimiento para tareas pesadas.",
            "Muy buena relación precio-calidad.",
            "El diseño es cómodo y ligero."
        ]
    },
    {
        id: 2,
        name: "Notebook Hp 15-dy5000la Core I5-1235u 8gb 512gb 15.6 HD W11h",
        price: 1250000,
        image: "../images/imagenes/Notebook Hp 15-dy5000la Core I5-1235u 8gb 512gb 15.6 Hd W11h.webp",
        features: "8GB RAM, 512GB SSD, Intel i5 1235u, Windows 11 Home",
        rating: 4.3,
        reviews: [
            "Muy buena para uso diario y oficina.",
            "Pantalla con buena resolución.",
            "Batería dura bastante tiempo."
        ]
    },
    {
        id: 3,
        name: "Notebook Hp 15z-ef3000 Amd Ryzen 5 5625u 8gb 256gb W11 15.6",
        price: 1500000,
        image: "../images/imagenes/Notebook Hp 15z-ef3000 Amd Ryzen 5 5625u 8gb 256gb W11 15.6.webp",
        features: "8GB RAM, 256GB SSD, AMD Ryzen 5 5625u, Windows 11",
        rating: 4.4,
        reviews: [
            "Rápida y eficiente para multitareas.",
            "Muy buen rendimiento con programas pesados.",
            "El diseño podría ser más moderno."
        ]
    },
    {
        id: 4,
        name: "Notebook Hp 255 G10 15.6 Ryzen 3 7330u 8gb 512gb W11 Home",
        price: 1100000,
        image: "../images/imagenes/Notebook Hp 255 G10 15.6 Ryzen 3 7330u 8gb 512gb W11 Home.webp",
        features: "8GB RAM, 512GB SSD, Ryzen 3 7330u, Windows 11 Home",
        rating: 4.1,
        reviews: [
            "Buena para tareas básicas y navegación.",
            "Precio accesible para sus características.",
            "La pantalla puede mejorar en brillo."
        ]
    },
    {
        id: 5,
        name: "Notebook Asus E410MA Intel Celeron N4020 4Gb 128Gb EMMC",
        price: 800000,
        image: "../images/imagenes/Notebook Asus E410MA Intel Celeron N4020 4Gb 128Gb EMMC 14 HD W11.jpg",
        features: "4GB RAM, 128GB eMMC, Intel Celeron N4020, Windows 11",
        rating: 3.9,
        reviews: [
            "Ideal para trabajos simples y estudiantes.",
            "Ligera y portátil.",
            "Limitada para tareas exigentes."
        ]
    },
    {
        id: 6,
        name: "Lenovo ThinkPad T16 3er Gen (16”, Intel)",
        price: 2400000,
        image: "../images/imagenes/Lenovo ThinkPad T16 3er Gen (16”, Intel).avif",
        features: "16” pantalla, Intel Gen 3, alta performance",
        rating: 4.7,
        reviews: [
            "Excelente para profesionales que necesitan potencia.",
            "Construcción robusta y teclado cómodo.",
            "Batería de larga duración."
        ]
    },
    {
        id: 7,
        name: "Lenovo Yoga Slim 7x Gen 9 (14” Snapdragon)",
        price: 2300000,
        image: "../images/imagenes/Lenovo Yoga Slim 7x Gen 9 (14” Snapdragon).avif",
        features: "14” pantalla, procesador Snapdragon, ultraligera",
        rating: 4.6,
        reviews: [
            "Muy liviana y elegante.",
            "Ideal para movilidad y productividad.",
            "Pantalla con colores vibrantes."
        ]
    },
    {
        id: 8,
        name: "Enova Amd Ryzen 5 3000 Series Windows 11",
        price: 700000,
        image: "../images/imagenes/Notebook Enova Amd Ryzen 5 3000 Series Windows 11.jpg",
        features: "AMD Ryzen 5, Windows 11, buena relación precio/calidad",
        rating: 4.0,
        reviews: [
            "Muy buena para el precio que tiene.",
            "Funciona bien con software básico y multimedia.",
            "Diseño sencillo pero funcional."
        ]
    }
];

window.products = products;

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function showNotification(message, type = "success") {
    const notif = document.getElementById('notification');
    if (!notif) return;
    notif.innerText = message;
    notif.className = 'show ' + type;
    setTimeout(() => {
        notif.className = '';
    }, 2500);
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    updateCart();
    showNotification(`${product.name} agregado al carrito`);
}

function removeFromCart(id) {
    const item = cart.find(p => p.id === id);
    if (!item) return;
    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart = cart.filter(p => p.id !== id);
    }
    saveCart();
    updateCart();
    showNotification(`${item.name} eliminado del carrito`, 'error');
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCart() {
    const summary = document.getElementById('cart-summary');
    if (!summary) return;

    if (cart.length === 0) {
        summary.innerHTML = `<h3>Carrito vacío</h3>`;
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    summary.innerHTML = `
        <h3>Resumen del Carrito</h3>
        <ul>
            ${cart.map(item => `
                <li>
                    ${item.name} x${item.quantity} - $${item.price * item.quantity}
                    <button onclick="removeFromCart(${item.id})">❌</button>
                </li>
            `).join('')}
        </ul>
        <h4>Total: $${total}</h4>
    `;
}

function finalizarCompra() {
    if (cart.length === 0) {
        showNotification('El carrito está vacío', 'error');
        return;
    }
    cart = [];
    saveCart();
    updateCart();
    showNotification('¡Compra realizada con éxito! ✅', 'success');
}
