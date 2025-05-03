/**
 * DMCI IMMOBILIER - Properties Page Scripts
 * This script handles property related functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize property filters
    initPropertyFilters();
    
    // Initialize property modal
    initPropertyModal();
});

/**
 * Initialize property filters functionality
 */
function initPropertyFilters() {
    const filterForm = document.getElementById('property-filter-form');
    
    if (!filterForm) return;
    
    filterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get filter values
        const propertyType = document.getElementById('property-type').value;
        const transactionType = document.getElementById('transaction-type').value;
        const minPrice = document.getElementById('min-price').value;
        const maxPrice = document.getElementById('max-price').value;
        const location = document.getElementById('location').value;
        
        // For demo purposes, we'll just log these values
        console.log('Filtering properties with:', {
            propertyType,
            transactionType,
            minPrice,
            maxPrice,
            location
        });
        
        // In a real implementation, this would filter the property cards
        // or make an AJAX request to load filtered properties
        
        // Show a simple demo filter effect
        const propertyCards = document.querySelectorAll('.property-card');
        let visibleCount = 0;
        
        propertyCards.forEach((card, index) => {
            // Simple demo filtering logic - random visibility based on filters
            // In a real implementation, this would be based on actual property data
            const isVisible = Math.random() > 0.3; // 70% chance of being visible
            
            if (isVisible) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update properties count
        const propertiesTotal = document.getElementById('properties-total');
        if (propertiesTotal) {
            propertiesTotal.textContent = visibleCount;
        }
        
        // Add an animation effect to show filtering happened
        const propertiesGrid = document.querySelector('.properties-grid');
        if (propertiesGrid) {
            propertiesGrid.style.opacity = '0.5';
            setTimeout(() => {
                propertiesGrid.style.opacity = '1';
            }, 300);
        }
    });
}

/**
 * Initialize property modal functionality
 */
function initPropertyModal() {
    const modal = document.getElementById('property-modal');
    
    if (!modal) return;
    
    const closeButton = modal.querySelector('.close-modal');
    const propertyDetailsBtns = document.querySelectorAll('.property-details-btn');
    const modalMainImage = document.getElementById('modal-main-image');
    const thumbnails = modal.querySelectorAll('.thumbnail');
    
    // Property details modal open button
    propertyDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const propertyId = this.getAttribute('data-id');
            openPropertyModal(propertyId);
        });
    });
    
    // Close modal
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside content
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Image gallery in modal
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image
            if (modalMainImage) {
                modalMainImage.src = this.src;
            }
        });
    });
    
    /**
     * Open the property modal with specific property details
     * @param {string} propertyId - The ID of the property to display
     */
    function openPropertyModal(propertyId) {
        // In a real implementation, this would fetch property details
        // based on the propertyId and populate the modal
        
        // For demo, we'll use some hardcoded property data
        const propertyData = getPropertyData(propertyId);
        
        // Update modal content with property data
        document.getElementById('modal-property-title').textContent = propertyData.title;
        document.getElementById('modal-property-price').textContent = propertyData.price;
        document.getElementById('modal-property-location').innerHTML = 
            `<i class="fas fa-map-marker-alt"></i> ${propertyData.location}`;
        document.getElementById('modal-property-features').innerHTML = propertyData.features;
        document.getElementById('modal-property-description').textContent = propertyData.description;
        document.getElementById('modal-property-details-list').innerHTML = propertyData.detailsList;
        
        // Update main image
        if (modalMainImage) {
            modalMainImage.src = propertyData.mainImage;
        }
        
        // Show modal
        modal.style.display = 'block';
        
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
    }
    
    /**
     * Close the property modal
     */
    function closeModal() {
        modal.style.display = 'none';
        
        // Re-enable body scrolling
        document.body.style.overflow = '';
    }
    
    /**
     * Get property data by ID
     * @param {string} propertyId - The ID of the property
     * @returns {Object} - The property data
     */
    function getPropertyData(propertyId) {
        // Demo data - in a real implementation, this would come from a database
        const propertyData = {
            prop1: {
                title: 'Villa moderne à Bassam',
                price: '75 000 000 FCFA',
                location: 'Bassam, Quartier Résidentiel',
                features: `
                    <span><i class="fas fa-bed"></i> 4 Chambres</span>
                    <span><i class="fas fa-bath"></i> 3 SdB</span>
                    <span><i class="fas fa-ruler-combined"></i> 250m²</span>
                    <span><i class="fas fa-car"></i> 2 Garages</span>
                `,
                description: 'Magnifique villa moderne située dans un quartier résidentiel calme et sécurisé à Bassam. Cette propriété offre 4 chambres spacieuses, 3 salles de bain, un grand salon, une cuisine équipée, une terrasse, un jardin bien entretenu et 2 garages. Idéale pour une famille cherchant confort et tranquillité.',
                detailsList: `
                    <li><strong>Type de bien:</strong> Villa</li>
                    <li><strong>Statut:</strong> À vendre</li>
                    <li><strong>Surface du terrain:</strong> 600m²</li>
                    <li><strong>Année de construction:</strong> 2020</li>
                    <li><strong>Climatisation:</strong> Oui</li>
                    <li><strong>Sécurité:</strong> Gardiennage 24/7</li>
                `,
                mainImage: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            prop2: {
                title: 'Appartement Haut Standing',
                price: '450 000 FCFA/mois',
                location: 'Bassam, Centre-ville',
                features: `
                    <span><i class="fas fa-bed"></i> 3 Chambres</span>
                    <span><i class="fas fa-bath"></i> 2 SdB</span>
                    <span><i class="fas fa-ruler-combined"></i> 120m²</span>
                    <span><i class="fas fa-wifi"></i> Internet</span>
                `,
                description: 'Superbe appartement de haut standing au cœur de Bassam. Cet espace moderne et lumineux comprend 3 chambres confortables, 2 salles de bain, un salon spacieux, une cuisine américaine entièrement équipée et un balcon offrant une vue imprenable. Le bâtiment dispose d\'une sécurité 24/7, d\'un parking et d\'une piscine commune.',
                detailsList: `
                    <li><strong>Type de bien:</strong> Appartement</li>
                    <li><strong>Statut:</strong> À louer</li>
                    <li><strong>Étage:</strong> 3ème</li>
                    <li><strong>Meublé:</strong> Non</li>
                    <li><strong>Climatisation:</strong> Oui</li>
                    <li><strong>Parking:</strong> 1 place</li>
                `,
                mainImage: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            prop3: {
                title: 'Terrain constructible',
                price: '25 000 000 FCFA',
                location: 'Bassam, Zone d\'extension',
                features: `
                    <span><i class="fas fa-ruler-combined"></i> 500m²</span>
                    <span><i class="fas fa-file-contract"></i> Titre foncier</span>
                    <span><i class="fas fa-road"></i> Accès route</span>
                `,
                description: 'Terrain constructible idéalement situé dans la zone d\'extension de Bassam. Ce terrain plat de 500m² dispose d\'un titre foncier en règle et est prêt à accueillir votre projet de construction. Il bénéficie d\'un accès direct à la route principale et est proche des commodités essentielles.',
                detailsList: `
                    <li><strong>Type de bien:</strong> Terrain</li>
                    <li><strong>Statut:</strong> À vendre</li>
                    <li><strong>Surface:</strong> 500m²</li>
                    <li><strong>Façade:</strong> 20m</li>
                    <li><strong>Profondeur:</strong> 25m</li>
                    <li><strong>Viabilisé:</strong> Eau et électricité à proximité</li>
                `,
                mainImage: 'https://images.pexels.com/photos/7031406/pexels-photo-7031406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            prop4: {
                title: 'Maison familiale spacieuse',
                price: '90 000 000 FCFA',
                location: 'Bassam, Quartier Résidentiel',
                features: `
                    <span><i class="fas fa-bed"></i> 5 Chambres</span>
                    <span><i class="fas fa-bath"></i> 3 SdB</span>
                    <span><i class="fas fa-ruler-combined"></i> 300m²</span>
                    <span><i class="fas fa-swimming-pool"></i> Piscine</span>
                `,
                description: 'Grande maison familiale dans un quartier résidentiel prisé de Bassam. Cette propriété de caractère offre 5 chambres, 3 salles de bain, un grand salon, une salle à manger séparée, une cuisine équipée, un bureau, une terrasse couverte, une piscine et un jardin arboré. Idéale pour les familles nombreuses ou pour recevoir.',
                detailsList: `
                    <li><strong>Type de bien:</strong> Maison</li>
                    <li><strong>Statut:</strong> À vendre</li>
                    <li><strong>Surface du terrain:</strong> 800m²</li>
                    <li><strong>Année de construction:</strong> 2015</li>
                    <li><strong>Climatisation:</strong> Oui</li>
                    <li><strong>Sécurité:</strong> Alarme et gardiennage</li>
                `,
                mainImage: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            prop5: {
                title: 'Studio moderne',
                price: '150 000 FCFA/mois',
                location: 'Bassam, Centre-ville',
                features: `
                    <span><i class="fas fa-bed"></i> 1 Chambre</span>
                    <span><i class="fas fa-bath"></i> 1 SdB</span>
                    <span><i class="fas fa-ruler-combined"></i> 45m²</span>
                    <span><i class="fas fa-couch"></i> Meublé</span>
                `,
                description: 'Studio moderne et entièrement meublé au centre de Bassam. Idéal pour un professionnel ou un étudiant, ce studio comprend un espace de vie avec kitchenette équipée, une chambre séparée, une salle de bain et un petit balcon. Situé à proximité des commerces, restaurants et transports.',
                detailsList: `
                    <li><strong>Type de bien:</strong> Studio</li>
                    <li><strong>Statut:</strong> À louer</li>
                    <li><strong>Étage:</strong> 2ème</li>
                    <li><strong>Meublé:</strong> Oui</li>
                    <li><strong>Climatisation:</strong> Oui</li>
                    <li><strong>Charges incluses:</strong> Eau</li>
                `,
                mainImage: 'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            prop6: {
                title: 'Immeuble commercial',
                price: '150 000 000 FCFA',
                location: 'Bassam, Centre-ville',
                features: `
                    <span><i class="fas fa-building"></i> 3 Étages</span>
                    <span><i class="fas fa-ruler-combined"></i> 500m²</span>
                    <span><i class="fas fa-car"></i> Parking</span>
                `,
                description: 'Immeuble commercial idéalement situé au centre-ville de Bassam. Ce bâtiment de 3 étages offre une superficie totale de 500m² répartie en plusieurs espaces commerciaux et bureaux. Le rez-de-chaussée convient parfaitement à un commerce, tandis que les étages supérieurs sont aménagés en bureaux modernes. L\'immeuble dispose également d\'un parking privé.',
                detailsList: `
                    <li><strong>Type de bien:</strong> Immeuble commercial</li>
                    <li><strong>Statut:</strong> À vendre</li>
                    <li><strong>Surface du terrain:</strong> 300m²</li>
                    <li><strong>Surface bâtie:</strong> 500m²</li>
                    <li><strong>Année de construction:</strong> 2018</li>
                    <li><strong>Locataires actuels:</strong> Oui (bail commercial)</li>
                `,
                mainImage: 'https://images.pexels.com/photos/1212053/pexels-photo-1212053.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            }
        };
        
        // Return the requested property data or a default if not found
        return propertyData[propertyId] || propertyData.prop1;
    }
}