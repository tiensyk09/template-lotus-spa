import { query } from './db';
import { hashPassword } from './auth';

export async function initDatabase() {
  // Signups table
  await query(`
    CREATE TABLE IF NOT EXISTS signups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email VARCHAR(255) NOT NULL UNIQUE,
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Contact messages table (tin nhắn từ trang Liên hệ)
  await query(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(100),
      email VARCHAR(255),
      subject VARCHAR(255),
      message TEXT NOT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'new',
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Settings table
  await query(`
    CREATE TABLE IF NOT EXISTS settings (
      \`key\` VARCHAR(255) NOT NULL PRIMARY KEY,
      \`value\` TEXT
    )
  `);

  // Users table
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username VARCHAR(255) NOT NULL UNIQUE,
      password TEXT NOT NULL,
      display_name TEXT,
      email TEXT,
      phone VARCHAR(100),
      address TEXT,
      role VARCHAR(50) NOT NULL DEFAULT 'member',
      tier VARCHAR(50) NOT NULL DEFAULT 'Free',
      active INTEGER NOT NULL DEFAULT 1,
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  try {
    await query('ALTER TABLE users ADD COLUMN phone VARCHAR(100)');
  } catch (err) {}

  try {
    await query('ALTER TABLE users ADD COLUMN address TEXT');
  } catch (err) {}

  try {
    await query("ALTER TABLE users ADD COLUMN tier VARCHAR(50) NOT NULL DEFAULT 'Free'");
  } catch (err) {}

  // Alter products table columns if missing
  const productsColumns = [
    { name: 'original_price', type: 'REAL' },
    { name: 'images', type: 'TEXT' },
    { name: 'brand', type: 'VARCHAR(255)' },
    { name: 'origin', type: 'VARCHAR(255)' },
    { name: 'unit', type: "VARCHAR(100) DEFAULT 'Hộp'" },
    { name: 'sold_count', type: 'INTEGER DEFAULT 0' },
    { name: 'view_count', type: 'INTEGER DEFAULT 0' },
    { name: 'rating', type: 'REAL DEFAULT 0' },
    { name: 'is_featured', type: 'INTEGER DEFAULT 0' },
    { name: 'is_flash_sale', type: 'INTEGER DEFAULT 0' },
    { name: 'flash_sale_price', type: 'REAL' },
    { name: 'flash_sale_end', type: 'VARCHAR(100)' },
    { name: 'tags', type: 'TEXT' },
    { name: 'meta_title', type: 'TEXT' },
    { name: 'meta_description', type: 'TEXT' }
  ];

  for (const col of productsColumns) {
    try {
      await query(`ALTER TABLE products ADD COLUMN ${col.name} ${col.type}`);
    } catch (err) {
      // Column might already exist
    }
  }

  // Posts/Changelog table
  await query(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug VARCHAR(255) NOT NULL UNIQUE,
      title TEXT NOT NULL,
      summary TEXT,
      content TEXT,
      image TEXT,
      author_id INTEGER,
      author_name TEXT,
      status VARCHAR(50) NOT NULL DEFAULT 'draft',
      views INTEGER DEFAULT 0,
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')),
      updated_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Pages table
  await query(`
    CREATE TABLE IF NOT EXISTS pages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug VARCHAR(255) NOT NULL UNIQUE,
      title TEXT NOT NULL,
      description TEXT,
      layout TEXT,
      status VARCHAR(50) NOT NULL DEFAULT 'published',
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')),
      updated_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // API Keys table
  await query(`
    CREATE TABLE IF NOT EXISTS api_keys (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      api_key VARCHAR(255) NOT NULL UNIQUE,
      user_id INTEGER NOT NULL,
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // File Categories table
  await query(`
    CREATE TABLE IF NOT EXISTS file_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Files table
  await query(`
    CREATE TABLE IF NOT EXISTS files (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(500) NOT NULL,
      file_type VARCHAR(50),
      url LONGTEXT NOT NULL,
      file_size VARCHAR(50),
      folder VARCHAR(200) DEFAULT 'general',
      uploaded_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')),
      uploaded_by INT,
      description TEXT,
      is_public INT DEFAULT 1,
      downloads INT DEFAULT 0,
      FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  // Post Attachments table
  await query(`
    CREATE TABLE IF NOT EXISTS post_attachments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INT,
      name VARCHAR(500) NOT NULL,
      original_name VARCHAR(500),
      file_type VARCHAR(100),
      file_size BIGINT DEFAULT 0,
      file_size_label VARCHAR(50),
      url LONGTEXT NOT NULL,
      uploaded_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')),
      uploaded_by INT,
      downloads INT DEFAULT 0,
      FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  // Download tokens tracking table
  await query(`
    CREATE TABLE IF NOT EXISTS download_tokens (
      token VARCHAR(200) PRIMARY KEY,
      use_count INT DEFAULT 0,
      expires_at BIGINT NOT NULL
    )
  `);

  // Installed Plugins table — lưu plugin đã cài và config trong DB của website
  await query(`
    CREATE TABLE IF NOT EXISTS installed_plugins (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      version TEXT DEFAULT '1.0.0',
      config TEXT DEFAULT '{}',
      active INTEGER NOT NULL DEFAULT 1,
      installed_at DATETIME DEFAULT (datetime('now'))
    )
  `);


  // ─── E-COMMERCE TABLES ───────────────────────────────────────

  // Shop Categories (danh mục sản phẩm)
  await query(`
    CREATE TABLE IF NOT EXISTS shop_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      parent_id INTEGER,
      icon VARCHAR(100),
      image TEXT,
      description TEXT,
      is_active INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0,
      created_at VARCHAR(100) DEFAULT (datetime('now'))
    )
  `);

  // Products (sản phẩm)
  await query(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      short_description TEXT,
      description TEXT,
      price REAL NOT NULL DEFAULT 0,
      original_price REAL,
      thumbnail TEXT,
      images TEXT,
      brand VARCHAR(255),
      origin VARCHAR(255),
      unit VARCHAR(100) DEFAULT 'Hộp',
      stock INTEGER DEFAULT 0,
      sold_count INTEGER DEFAULT 0,
      view_count INTEGER DEFAULT 0,
      rating REAL DEFAULT 0,
      status VARCHAR(50) DEFAULT 'active',
      is_featured INTEGER DEFAULT 0,
      is_flash_sale INTEGER DEFAULT 0,
      flash_sale_price REAL,
      flash_sale_end VARCHAR(100),
      tags TEXT,
      meta_title TEXT,
      meta_description TEXT,
      created_at VARCHAR(100) DEFAULT (datetime('now')),
      updated_at VARCHAR(100) DEFAULT (datetime('now')),
      FOREIGN KEY (category_id) REFERENCES shop_categories(id) ON DELETE SET NULL
    )
  `);

  // Product Variants (biến thể sản phẩm: Hộp, Vỉ, Chai...)
  await query(`
    CREATE TABLE IF NOT EXISTS product_variants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      name VARCHAR(255) NOT NULL,
      price REAL NOT NULL,
      stock INTEGER DEFAULT 0,
      sort_order INTEGER DEFAULT 0,
      created_at VARCHAR(100) DEFAULT (datetime('now')),
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )
  `);

  // Product Reviews (đánh giá)
  await query(`
    CREATE TABLE IF NOT EXISTS product_reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      order_id INTEGER,
      reviewer_name VARCHAR(255) NOT NULL,
      reviewer_id INTEGER,
      rating INTEGER NOT NULL DEFAULT 5,
      comment TEXT,
      is_verified INTEGER DEFAULT 0,
      created_at VARCHAR(100) DEFAULT (datetime('now')),
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )
  `);

  // Orders (đơn hàng)
  await query(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_code VARCHAR(100) NOT NULL UNIQUE,
      user_id INTEGER,
      customer_name VARCHAR(255) NOT NULL,
      customer_phone VARCHAR(100) NOT NULL,
      customer_email VARCHAR(255),
      shipping_address TEXT NOT NULL,
      shipping_province VARCHAR(255),
      shipping_note TEXT,
      items TEXT NOT NULL,
      subtotal REAL NOT NULL DEFAULT 0,
      discount_amount REAL DEFAULT 0,
      shipping_fee REAL DEFAULT 0,
      total REAL NOT NULL DEFAULT 0,
      coupon_code VARCHAR(100),
      payment_method VARCHAR(50) DEFAULT 'cod',
      payment_status VARCHAR(50) DEFAULT 'pending',
      status VARCHAR(50) DEFAULT 'pending',
      admin_note TEXT,
      created_at VARCHAR(100) DEFAULT (datetime('now')),
      updated_at VARCHAR(100) DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  // Coupons (mã giảm giá)
  await query(`
    CREATE TABLE IF NOT EXISTS coupons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code VARCHAR(100) NOT NULL UNIQUE,
      discount_type VARCHAR(50) NOT NULL DEFAULT 'percent',
      discount_value REAL NOT NULL,
      min_order REAL DEFAULT 0,
      max_discount REAL,
      usage_limit INTEGER,
      usage_count INTEGER DEFAULT 0,
      expires_at VARCHAR(100),
      is_active INTEGER DEFAULT 1,
      created_at VARCHAR(100) DEFAULT (datetime('now'))
    )
  `);

  // Alter tables to add SEO columns dynamically if they do not exist
  const addColumns = [
    { table: 'pages', column: 'meta_title', type: 'TEXT' },
    { table: 'pages', column: 'meta_description', type: 'TEXT' },
    { table: 'pages', column: 'meta_keywords', type: 'TEXT' },
    { table: 'posts', column: 'meta_title', type: 'TEXT' },
    { table: 'posts', column: 'meta_description', type: 'TEXT' },
    { table: 'posts', column: 'meta_keywords', type: 'TEXT' }
  ];

  for (const item of addColumns) {
    try {
      await query(`ALTER TABLE ${item.table} ADD COLUMN ${item.column} ${item.type}`);
      console.log(`Added column ${item.column} to table ${item.table}`);
    } catch (err) {
      // Column already exists or error
    }
  }

  console.log('✅ Database tables created and migrated');
}


export async function seedData(adminPassword, force = false) {
  const passwordToSeed = adminPassword || 'admin123';
  
  // Check if we should force override because the database was previously seeded with data of another template
  let isOtherTemplate = false;
  try {
    const existingLogo = await query('SELECT `value` FROM settings WHERE `key` = ?', ['header_logo_text']);
    const oldLogos = ['Command Code', 'FPT Long Châu', 'Sâm Ngọc Linh'];
    if (existingLogo.length > 0 && oldLogos.includes(existingLogo[0].value)) {
      isOtherTemplate = true;
    }
  } catch (e) {
    // Table or settings might not exist yet
  }

  const shouldForce = force || isOtherTemplate;

  // Seed Settings
  const defaultSettings = [
    ['site_title', 'Lotus Spa - Vẻ đẹp từ thiên nhiên'],
    ['site_description', 'Lotus Spa mang đến trải nghiệm thư giãn và chăm sóc sắc đẹp chuyên sâu: massage thư giãn, chăm sóc da mặt, chăm sóc body, xông hơi thải độc, chăm sóc tóc với kỹ thuật viên chuyên nghiệp.'],
    ['site_keywords', 'lotus spa, massage thư giãn, chăm sóc da mặt, chăm sóc body, xông hơi thải độc, chăm sóc tóc, spa làm đẹp'],
    ['header_logo_text', 'Lotus Spa'],
    ['header_logo_icon', '🌸'],
    ['header_links', JSON.stringify([
      { label: 'Trang chủ', href: '/' },
      { label: 'Giới thiệu', href: '/about' },
      { label: 'Dịch vụ', href: '/products' },
      { label: 'Tin tức', href: '/blog' },
      { label: 'Liên hệ', href: '/contact' }
    ])],
    ['footer_copyright', '© 2024 Lotus Spa. All rights reserved.'],
    // Liên hệ mạng xã hội (để trống = ẩn icon tương ứng)
    ['social_facebook', ''],
    ['social_zalo', ''],
    ['social_youtube', ''],
    ['social_tiktok', ''],
    ['social_instagram', ''],
    ['social_x', ''],
    ['social_telegram', ''],
    ['social_discord', ''],
    ['social_linkedin', ''],
    ['footer_columns', JSON.stringify([
      {
        title: 'Về chúng tôi',
        links: [
          { label: 'Giới thiệu', href: '/about' },
          { label: 'Đội ngũ bác sĩ', href: '/about' },
          { label: 'Chính sách bảo hành', href: '#' }
        ]
      },
      {
        title: 'Hỗ trợ khách hàng',
        links: [
          { label: 'Câu hỏi thường gặp', href: '/blog' },
          { label: 'Hướng dẫn thanh toán', href: '#' },
          { label: 'Chính sách bảo mật', href: '#' }
        ]
      }
    ])]
  ];

  for (const [key, val] of defaultSettings) {
    try {
      if (shouldForce) {
        await query('INSERT OR REPLACE INTO settings (`key`, `value`) VALUES (?, ?)', [key, val]);
      } else {
        await query('INSERT OR IGNORE INTO settings (`key`, `value`) VALUES (?, ?)', [key, val]);
      }
    } catch (err) {
      console.error(`Failed to seed setting key ${key}:`, err);
    }
  }

  // Seed default admin and moderator users
  try {
    const adminExists = await query('SELECT id FROM users WHERE username = ?', ['admin']);
    const hashedAdminPw = await hashPassword(passwordToSeed);
    if (adminExists.length === 0) {
      await query(
        'INSERT INTO users (username, password, display_name, email, role, tier, active) VALUES (?, ?, ?, ?, ?, ?, 1)',
        ['admin', hashedAdminPw, 'Administrator', 'admin@lotusspa.vn', 'admin', 'Enterprise']
      );
      console.log('👑 Default admin user seeded');
    } else if (adminPassword) {
      await query('UPDATE users SET password = ? WHERE username = ?', [hashedAdminPw, 'admin']);
      console.log('👑 Admin user password updated to custom password');
    }

    const modExists = await query('SELECT id FROM users WHERE username = ?', ['moderator']);
    if (modExists.length === 0) {
      const hashedModPw = await hashPassword('mod123');
      await query(
        'INSERT INTO users (username, password, display_name, email, role, tier, active) VALUES (?, ?, ?, ?, ?, ?, 1)',
        ['moderator', hashedModPw, 'Staff Moderator', 'mod@lotusspa.vn', 'mod', 'Pro']
      );
      console.log('🛡️ Default moderator user seeded');
    }
  } catch (err) {
    console.error('Failed to seed default users:', err);
  }

  // Seed default dynamic pages
  try {
    const pageExists = await query('SELECT id FROM pages WHERE slug = ?', ['about']);
    if (pageExists.length === 0 || shouldForce) {
      const defaultLayout = [
        {
          id: 'b_about_hero',
          type: 'hero',
          visible: true,
          configs: {
            title: 'Sứ mệnh Lotus Spa',
            description: 'Mang đến vẻ đẹp và sự tự tin cho phụ nữ với các liệu trình chăm sóc sắc đẹp chuyên sâu, an toàn và hiệu quả trong không gian thư giãn yên tĩnh.',
            buttonText: 'Xem dịch vụ',
            buttonLink: '/products'
          }
        },
        {
          id: 'b_about_feat',
          type: 'features',
          visible: true,
          configs: {
            tag: 'GIÁ TRỊ CỐT LÕI',
            title: 'Nơi sắc đẹp tỏa sáng',
            description: 'Hơn 10 năm đồng hành cùng vẻ đẹp phụ nữ Việt.',
            items: [
              { title: 'Kỹ Thuật Viên Chuyên Nghiệp', desc: 'Đội ngũ được đào tạo bài bản, tận tâm và giàu kinh nghiệm.' },
              { title: 'Sản Phẩm Chính Hãng', desc: 'Dược mỹ phẩm cao cấp, an toàn, nguồn gốc rõ ràng.' },
              { title: 'Không Gian Thư Giãn', desc: 'Không gian yên tĩnh, sang trọng, mang lại cảm giác thư thái.' }
            ]
          }
        }
      ];
      if (pageExists.length > 0) {
        await query('DELETE FROM pages WHERE slug = ?', ['about']);
      }
      await query(
        'INSERT INTO pages (slug, title, description, layout, status) VALUES (?, ?, ?, ?, ?)',
        ['about', 'Giới thiệu về chúng tôi', 'Lotus Spa - Nơi sắc đẹp tỏa sáng với các liệu trình chăm sóc sắc đẹp và thư giãn chuyên sâu.', JSON.stringify(defaultLayout), 'published']
      );
      console.log('📄 Default about page seeded');
    }
  } catch (err) {
    console.error('Failed to seed default pages:', err);
  }

  // Seed default file categories
  try {
    const existingFileCats = await query('SELECT COUNT(*) as cnt FROM file_categories');
    if (existingFileCats[0].cnt === 0) {
      const defaultFileCats = [
        { name: 'Chưa phân loại', slug: 'general' },
        { name: 'Ảnh minh họa', slug: 'images' },
        { name: 'Tài liệu hướng dẫn', slug: 'documents' },
        { name: 'Mã nguồn / Code', slug: 'code' },
        { name: 'Khác', slug: 'other' }
      ];
      for (const c of defaultFileCats) {
        await query('INSERT OR IGNORE INTO file_categories (name, slug) VALUES (?, ?)', [c.name, c.slug]);
      }
      console.log('📁 Default file categories seeded');
    }
  } catch (err) {
    console.error('Failed to seed default file categories:', err);
  }

  // Seed E-Commerce data (shop categories + sample products + coupon)
  try {
    const catCount = await query('SELECT COUNT(*) as cnt FROM shop_categories');
    if (catCount[0].cnt === 0 || shouldForce) {
      if (shouldForce) {
        await query('DELETE FROM shop_categories');
      }
      const defaultCats = [
        { name: 'Massage Thư Giãn', slug: 'massage-thu-gian', icon: '💆', image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=600&q=80', sort_order: 1 },
        { name: 'Chăm Sóc Da Mặt', slug: 'cham-soc-da-mat', icon: '🧖', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80', sort_order: 2 },
        { name: 'Chăm Sóc Body', slug: 'cham-soc-body', icon: '🌸', image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&q=80', sort_order: 3 },
        { name: 'Xông Hơi Thải Độc', slug: 'xong-hoi-thai-doc', icon: '♨️', image: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=600&q=80', sort_order: 4 },
        { name: 'Chăm Sóc Tóc', slug: 'cham-soc-toc', icon: '💇', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80', sort_order: 5 },
      ];
      for (const c of defaultCats) {
        await query(
          'INSERT OR IGNORE INTO shop_categories (name, slug, icon, image, sort_order) VALUES (?, ?, ?, ?, ?)',
          [c.name, c.slug, c.icon, c.image, c.sort_order]
        );
      }
      console.log('🛍️ Default shop categories seeded');
    }

    const prodCount = await query('SELECT COUNT(*) as cnt FROM products');
    if (prodCount[0].cnt === 0 || shouldForce) {
      if (shouldForce) {
        await query('DELETE FROM products');
        await query('DELETE FROM product_variants');
      }
      const catMassage = await query("SELECT id FROM shop_categories WHERE slug = 'massage-thu-gian'");
      const catDaMat = await query("SELECT id FROM shop_categories WHERE slug = 'cham-soc-da-mat'");
      const catBody = await query("SELECT id FROM shop_categories WHERE slug = 'cham-soc-body'");
      const catXongHoi = await query("SELECT id FROM shop_categories WHERE slug = 'xong-hoi-thai-doc'");
      const catToc = await query("SELECT id FROM shop_categories WHERE slug = 'cham-soc-toc'");

      const catIdMassage = catMassage[0]?.id || null;
      const catIdDaMat = catDaMat[0]?.id || null;
      const catIdBody = catBody[0]?.id || null;
      const catIdXongHoi = catXongHoi[0]?.id || null;
      const catIdToc = catToc[0]?.id || null;

      const sampleProducts = [
        { category_id: catIdMassage, name: 'Massage Thư Giãn Toàn Thân', slug: 'massage-thu-gian', short_description: 'Giúp thư giãn cơ thể, giảm căng thẳng, lưu thông khí huyết, mang lại cảm giác thoải mái.', price: 350000, original_price: 500000, thumbnail: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=600&q=80', brand: 'Lotus Spa', origin: 'Thảo dược thiên nhiên', unit: 'Buổi', stock: 500, is_featured: 1, is_flash_sale: 1, flash_sale_price: 350000 },
        { category_id: catIdDaMat, name: 'Chăm Sóc Da Mặt Chuyên Sâu', slug: 'cham-soc-da-mat', short_description: 'Làm sạch sâu, dưỡng ẩm và tái tạo da, mang lại làn da sáng mịn, rạng rỡ.', price: 450000, original_price: 600000, thumbnail: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80', brand: 'Lotus Spa', origin: 'Dược mỹ phẩm cao cấp', unit: 'Buổi', stock: 500, is_featured: 1 },
        { category_id: catIdBody, name: 'Chăm Sóc Body Trắng Sáng', slug: 'cham-soc-body', short_description: 'Tẩy tế bào chết, dưỡng da toàn thân trắng sáng, mịn màng, đều màu.', price: 550000, original_price: 750000, thumbnail: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&q=80', brand: 'Lotus Spa', origin: 'Thảo dược thiên nhiên', unit: 'Buổi', stock: 500, is_featured: 1, is_flash_sale: 1, flash_sale_price: 550000 },
        { category_id: catIdXongHoi, name: 'Xông Hơi Thải Độc', slug: 'xong-hoi-thai-doc', short_description: 'Thải độc tố, làm sạch da, cải thiện sức khỏe và tinh thần, thư giãn tối đa.', price: 250000, original_price: 350000, thumbnail: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=600&q=80', brand: 'Lotus Spa', origin: 'Thảo dược thiên nhiên', unit: 'Buổi', stock: 500, is_featured: 1 },
        { category_id: catIdToc, name: 'Chăm Sóc Tóc & Da Đầu', slug: 'cham-soc-toc', short_description: 'Nuôi dưỡng tóc chắc khỏe, suôn mượt, giảm gãy rụng, phục hồi da đầu.', price: 300000, original_price: 400000, thumbnail: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80', brand: 'Lotus Spa', origin: 'Dược mỹ phẩm cao cấp', unit: 'Buổi', stock: 500, is_featured: 1 }
      ];

      for (const p of sampleProducts) {
        try {
          await query(
            `INSERT OR IGNORE INTO products (category_id, name, slug, short_description, price, original_price, thumbnail, brand, origin, unit, stock, is_featured, is_flash_sale, flash_sale_price, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')`,
            [p.category_id, p.name, p.slug, p.short_description, p.price, p.original_price || null, p.thumbnail || null, p.brand || null, p.origin || null, p.unit || 'Kg', p.stock || 0, p.is_featured || 0, p.is_flash_sale || 0, p.flash_sale_price || null]
          );
          // Add variants for each product
          const prod = await query('SELECT id FROM products WHERE slug = ?', [p.slug]);
          if (prod.length > 0) {
            const pid = prod[0].id;
            await query('INSERT INTO product_variants (product_id, name, price, stock) VALUES (?, ?, ?, ?)', [pid, p.unit || 'Kg', p.price, p.stock]);
          }
        } catch (e) { /* ignore duplicate */ }
      }
      console.log('🛒 Sample products seeded');
    }

    // Seed default blog posts
    const postCount = await query('SELECT COUNT(*) as cnt FROM posts');
    if (postCount[0].cnt === 0 || shouldForce) {
      if (shouldForce) {
        await query('DELETE FROM posts');
      }
      
      const defaultPosts = [
        {
          title: '5 thói quen chăm sóc da mỗi ngày cho làn da rạng rỡ',
          slug: '5-thoi-quen-cham-soc-da-moi-ngay',
          summary: 'Làn da khỏe đẹp không chỉ đến từ liệu trình spa mà còn từ thói quen chăm sóc hằng ngày. Cùng khám phá 5 thói quen đơn giản giúp da luôn tươi trẻ, rạng rỡ.',
          content: 'Để làn da luôn khỏe đẹp, bạn nên: 1) Làm sạch da đúng cách 2 lần mỗi ngày với sữa rửa mặt dịu nhẹ; 2) Dưỡng ẩm đầy đủ giúp da mềm mại, hạn chế lão hóa; 3) Luôn thoa kem chống nắng khi ra ngoài để bảo vệ da khỏi tia UV; 4) Uống đủ nước và bổ sung rau xanh, trái cây giàu vitamin; 5) Thư giãn, ngủ đủ giấc và chăm sóc da chuyên sâu tại spa định kỳ 2-4 tuần/lần để da luôn tươi trẻ.',
          image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80',
          author_name: 'Chuyên viên Lotus Spa'
        },
        {
          title: 'Massage trị liệu có lợi ích gì cho sức khỏe?',
          slug: 'massage-tri-lieu-loi-ich-suc-khoe',
          summary: 'Massage trị liệu không chỉ giúp thư giãn mà còn mang lại nhiều lợi ích cho sức khỏe thể chất và tinh thần. Cùng tìm hiểu những công dụng tuyệt vời của massage.',
          content: 'Massage trị liệu là liệu pháp tác động lên cơ thể bằng các kỹ thuật xoa bóp chuyên nghiệp. Lợi ích nổi bật: giải tỏa căng thẳng và stress, giúp tinh thần thư thái; lưu thông khí huyết, giảm đau mỏi cơ và vai gáy; cải thiện chất lượng giấc ngủ; tăng cường trao đổi chất và đào thải độc tố. Để đạt hiệu quả tốt nhất, bạn nên massage định kỳ 1-2 lần mỗi tuần với kỹ thuật viên chuyên nghiệp trong không gian yên tĩnh, thư giãn.',
          image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=800&q=80',
          author_name: 'Chuyên viên Lotus Spa'
        },
        {
          title: 'Xông hơi thải độc: bí quyết cho làn da và sức khỏe',
          slug: 'xong-hoi-thai-doc-bi-quyet-lan-da',
          summary: 'Xông hơi thải độc là phương pháp chăm sóc sức khỏe và làm đẹp được ưa chuộng. Vậy xông hơi mang lại lợi ích gì và nên thực hiện như thế nào cho đúng?',
          content: 'Xông hơi giúp lỗ chân lông giãn nở, đào thải độc tố và bã nhờn tích tụ, mang lại làn da sạch sâu, thông thoáng. Bên cạnh đó, hơi nóng còn giúp thư giãn cơ bắp, giảm căng thẳng, cải thiện tuần hoàn máu và hỗ trợ giảm cân. Bạn nên xông hơi 1-2 lần mỗi tuần, mỗi lần 15-20 phút, kết hợp thảo dược thiên nhiên như sả, gừng, lá bạc hà để tăng hiệu quả. Sau khi xông, hãy uống đủ nước và nghỉ ngơi để cơ thể phục hồi tốt nhất.',
          image: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=800&q=80',
          author_name: 'Chuyên viên Lotus Spa'
        }
      ];

      for (const p of defaultPosts) {
        await query(
          `INSERT INTO posts (slug, title, summary, content, image, author_name, status) VALUES (?, ?, ?, ?, ?, ?, 'published')`,
          [p.slug, p.title, p.summary, p.content, p.image, p.author_name]
        );
      }
      console.log('📝 Sample posts seeded');
    }

    // Seed a sample coupon
    const couponExists = await query("SELECT id FROM coupons WHERE code = 'LOTUS30'");
    if (couponExists.length === 0) {
      await query(
        "INSERT INTO coupons (code, discount_type, discount_value, min_order, max_discount, usage_limit, is_active) VALUES (?, ?, ?, ?, ?, ?, 1)",
        ['LOTUS30', 'percent', 30, 300000, 500000, 100]
      );
      console.log('🎟️ Sample coupon LOTUS30 seeded');
    }

  } catch (err) {
    console.error('Failed to seed E-Commerce data:', err);
  }

  console.log('✅ Seed data complete');
}
