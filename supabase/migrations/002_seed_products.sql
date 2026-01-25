-- Seed products table with Parketera flooring data
-- Note: Using gen_random_uuid() for unique IDs, legacy_id preserves original ID references
INSERT INTO products (
        legacy_id,
        category,
        name,
        unit,
        coverage_per_box,
        price,
        dimensions
    )
VALUES (
        1,
        'Parket',
        'Mat Bambuk',
        'm²',
        2,
        652,
        '1020x130x15'
    ),
    (
        2,
        'Parket',
        'Parlaq Bambuk',
        'm²',
        2,
        652,
        '1020x130x15'
    ),
    (
        33,
        'Parket',
        'Massiv Chevron',
        'm²',
        1,
        99,
        '580x132x14'
    ),
    (
        34,
        'Parket',
        'Massiv Herringbone',
        'm²',
        1,
        93.25,
        '610x132x14'
    ),
    (
        35,
        'Parket',
        'Herringbone N 001',
        'm²',
        2.4,
        600,
        '100x15'
    ),
    (
        55,
        'Parket',
        'Merbau - 120 Medium',
        'm²',
        1.44,
        0,
        '15x120x1500'
    ),
    (
        68,
        'Parket',
        'BalticWood 1R Nougat',
        'm²',
        1.439,
        0,
        '1080x148x13.3'
    ),
    (
        80,
        'Parket',
        'BalticWood 3R Forsty',
        'm²',
        3.587,
        0,
        '2190x182x13.3'
    ),
    (
        104,
        'Yapışdırıcı',
        'Tovcol MS Start 15g',
        'əd',
        0,
        0,
        '0'
    ),
    (
        104,
        'Lak',
        'Home Maxi Glossy 5lt',
        'əd',
        0,
        0,
        '0'
    ),
    (
        104,
        'Təmizləyici vasitə',
        'Tover LUX 1lt',
        'əd',
        0,
        0,
        '0'
    );
-- Verify insertion
DO $$
DECLARE product_count INTEGER;
BEGIN
SELECT COUNT(*) INTO product_count
FROM products;
RAISE NOTICE 'Successfully inserted % products',
product_count;
END $$;