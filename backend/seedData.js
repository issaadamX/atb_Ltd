const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'issa',
  password: process.env.DB_PASSWORD || '87654321',
  database: process.env.DB_NAME || 'abc.sarl'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database for seeding');
});

// Sample data
const sampleServices = [
  {
    title: 'Études et Conception',
    description: 'Nous réalisons des études techniques complètes et des conceptions architecturales adaptées à vos besoins.',
    features: JSON.stringify(['Études de faisabilité', 'Conception architecturale', 'Calculs structurels', 'Plans détaillés']),
    icon: 'compass'
  },
  {
    title: 'Construction Résidentielle',
    description: 'Construction de maisons individuelles, immeubles et complexes résidentiels de qualité supérieure.',
    features: JSON.stringify(['Maisons individuelles', 'Immeubles collectifs', 'Rénovations', 'Extensions']),
    icon: 'building'
  },
  {
    title: 'Bâtiments Industriels',
    description: 'Construction d\'entrepôts, usines et bâtiments industriels répondant aux normes les plus strictes.',
    features: JSON.stringify(['Entrepôts logistiques', 'Usines de production', 'Bâtiments spécialisés', 'Aménagements industriels']),
    icon: 'building2'
  },
  {
    title: 'Génie Civil',
    description: 'Travaux de génie civil incluant voiries, réseaux et infrastructures urbaines.',
    features: JSON.stringify(['Voiries et réseaux', 'Infrastructures urbaines', 'Travaux publics', 'Assainissement']),
    icon: 'hardhat'
  },
  {
    title: 'Expertise Technique',
    description: 'Services d\'expertise et de conseil technique pour vos projets de construction.',
    features: JSON.stringify(['Expertise bâtiment', 'Conseil technique', 'Études diagnostics', 'Contrôle qualité']),
    icon: 'calculator'
  },
  {
    title: 'Maintenance & Réparation',
    description: 'Services de maintenance préventive et curative pour tous types de constructions.',
    features: JSON.stringify(['Maintenance préventive', 'Réparations urgentes', 'Rénovations', 'Mises aux normes']),
    icon: 'wrench'
  }
];

const sampleProjects = [
  {
    title: 'Résidence Les Oliviers',
    type: 'Résidentiel',
    description: 'Complexe résidentiel moderne de 24 appartements avec espaces verts et parking souterrain.',
    image: '/assets/project-1.jpg',
    year: 2024,
    location: 'Casablanca'
  },
  {
    title: 'Entrepôt Logistique ABC',
    type: 'Industriel',
    description: 'Construction d\'un entrepôt logistique de 5000m² avec quai de chargement et bureaux administratifs.',
    image: '/assets/project-2.jpg',
    year: 2023,
    location: 'Mohammedia'
  },
  {
    title: 'Siège Social TechCorp',
    type: 'Commercial',
    description: 'Bâtiment de bureaux de 8 étages avec design moderne et espaces collaboratifs.',
    image: '/assets/project-3.jpg',
    year: 2023,
    location: 'Rabat'
  },
  {
    title: 'École Primaire Al Amal',
    type: 'Éducation',
    description: 'Construction d\'une école primaire de 12 classes avec cour de récréation et cantine.',
    image: '/assets/project-4.jpg',
    year: 2024,
    location: 'Marrakech'
  },
  {
    title: 'Centre Commercial Plaza',
    type: 'Commercial',
    description: 'Développement d\'un centre commercial de 15000m² avec parking et restaurants.',
    image: '/assets/project-5.jpg',
    year: 2022,
    location: 'Fès'
  },
  {
    title: 'Usine de Production PharmaPlus',
    type: 'Industriel',
    description: 'Construction d\'une usine pharmaceutique respectant les normes GMP et environnementales.',
    image: '/assets/project-6.jpg',
    year: 2023,
    location: 'Tanger'
  }
];

const sampleTestimonials = [
  {
    name: 'Ahmed Bennani',
    role: 'Directeur Général, TechCorp',
    content: 'ATB Ltd a réalisé notre siège social avec une qualité exceptionnelle. Leur expertise technique et leur respect des délais ont dépassé nos attentes.',
    rating: 5,
    type: 'text'
  },
  {
    name: 'Fatima Alaoui',
    role: 'Propriétaire, Résidence Les Oliviers',
    content: 'Construction de notre résidence familiale réalisée dans les règles de l\'art. Équipe professionnelle et matériaux de qualité.',
    rating: 5,
    type: 'text'
  },
  {
    name: 'Mohammed Tazi',
    role: 'PDG, LogiTrans',
    content: 'Notre entrepôt logistique a été construit selon nos spécifications exactes. Service impeccable du début à la fin du projet.',
    rating: 5,
    type: 'text'
  },
  {
    name: 'Leila Mansouri',
    role: 'Directrice, École Al Amal',
    content: 'L\'école construite par ATB Ltd offre un environnement d\'apprentissage moderne et sécurisant pour nos élèves.',
    rating: 5,
    type: 'text'
  }
];

// Insert sample data
const insertSampleData = () => {
  // Insert services
  sampleServices.forEach((service, index) => {
    const query = 'INSERT IGNORE INTO services (title, description, features, icon) VALUES (?, ?, ?, ?)';
    db.query(query, [service.title, service.description, service.features, service.icon], (err, result) => {
      if (err) {
        console.error(`Error inserting service ${index + 1}:`, err);
      } else if (result.affectedRows > 0) {
        console.log(`Service ${index + 1} inserted`);
      }
    });
  });

  // Insert projects
  sampleProjects.forEach((project, index) => {
    const query = 'INSERT IGNORE INTO projects (title, type, description, image, year, location) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [project.title, project.type, project.description, project.image, project.year, project.location], (err, result) => {
      if (err) {
        console.error(`Error inserting project ${index + 1}:`, err);
      } else if (result.affectedRows > 0) {
        console.log(`Project ${index + 1} inserted`);
      }
    });
  });

  // Insert testimonials
  sampleTestimonials.forEach((testimonial, index) => {
    const query = 'INSERT IGNORE INTO testimonials (name, role, content, rating, type) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [testimonial.name, testimonial.role, testimonial.content, testimonial.rating, testimonial.type], (err, result) => {
      if (err) {
        console.error(`Error inserting testimonial ${index + 1}:`, err);
      } else if (result.affectedRows > 0) {
        console.log(`Testimonial ${index + 1} inserted`);
      }
    });
  });
};

// Run seeding
insertSampleData();

// Close connection after operations
setTimeout(() => {
  db.end((err) => {
    if (err) {
      console.error('Error closing database connection:', err);
    } else {
      console.log('Sample data seeding completed');
    }
  });
}, 3000);
