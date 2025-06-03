-- Script generado automáticamente
-- 2025-06-03T02:23:38.457Z

-- Insertar géneros (si no existen)
INSERT IGNORE INTO Gender (gender_id, gender_name) VALUES
  (1, 'Masculino'),
  (2, 'Femenino'),
  (3, 'Otro');

-- Insertar usuarios
INSERT INTO User (
  email, password_hash, name, age, gender_id,
  profile_picture_url, description, rut, cedula_number
) VALUES
  (
    'gustavo.romoleon@gmail.com',
    '$2b$10$fzYw0jw7MTeSQK7yxjA2E.B7D2Chh7zCi8sFKpCt.NIxZlOVd7mrK',
    'Gustavo Romo León',
    50,
    1,
    'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/69.jpg',
    'Consuasor arbor tendo praesentium harum suffoco.',
    '18.841.338-5',
    '948242080'
  ),
  (
    'homero.morenomayorga47@yahoo.com',
    '$2b$10$fzYw0jw7MTeSQK7yxjA2E.B7D2Chh7zCi8sFKpCt.NIxZlOVd7mrK',
    'Homero Moreno Mayorga',
    55,
    1,
    'https://avatars.githubusercontent.com/u/44114592',
    'Cibus tracto aliqua.',
    '17.279.462-5',
    '818730107'
  ),
  (
    'luis.chavarriabrito13@gmail.com',
    '$2b$10$fzYw0jw7MTeSQK7yxjA2E.B7D2Chh7zCi8sFKpCt.NIxZlOVd7mrK',
    'Luis Chavarría Brito',
    28,
    1,
    'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/72.jpg',
    'Viriliter explicabo sequi bellicus saepe adulatio desipio.',
    '27.272.546-1',
    '986126708'
  ),
  (
    'benito.fuentesbravo69@hotmail.com',
    '$2b$10$fzYw0jw7MTeSQK7yxjA2E.B7D2Chh7zCi8sFKpCt.NIxZlOVd7mrK',
    'Benito Fuentes Bravo',
    24,
    1,
    'https://avatars.githubusercontent.com/u/67758721',
    'Ducimus chirographum cresco umbra in complectus.',
    '12.690.430-9',
    '529233976'
  ),
  (
    'pio_padillaroybal10@yahoo.com',
    '$2b$10$fzYw0jw7MTeSQK7yxjA2E.B7D2Chh7zCi8sFKpCt.NIxZlOVd7mrK',
    'Pío Padilla Roybal',
    26,
    3,
    'https://avatars.githubusercontent.com/u/4287653',
    'Tamen voluptatem sint censura ustulo.',
    '12.459.381-1',
    '514671064'
  ),
  (
    'oscar_sotoontiveros@yahoo.com',
    '$2b$10$fzYw0jw7MTeSQK7yxjA2E.B7D2Chh7zCi8sFKpCt.NIxZlOVd7mrK',
    'Óscar Soto Ontiveros',
    58,
    1,
    'https://avatars.githubusercontent.com/u/52794090',
    'Uterque cui calco abundans centum desparatus.',
    '30.839.120-8',
    '772741128'
  ),
  (
    'conchita.escobedolozano@hotmail.com',
    '$2b$10$fzYw0jw7MTeSQK7yxjA2E.B7D2Chh7zCi8sFKpCt.NIxZlOVd7mrK',
    'Conchita Escobedo Lozano',
    18,
    2,
    'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/59.jpg',
    'Absorbeo curatio crux tenuis acidus capio.',
    '19.557.356-8',
    '131798499'
  ),
  (
    'jorge.prietobustos@gmail.com',
    '$2b$10$fzYw0jw7MTeSQK7yxjA2E.B7D2Chh7zCi8sFKpCt.NIxZlOVd7mrK',
    'Jorge Prieto Bustos',
    29,
    3,
    'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/3.jpg',
    'Trado tristis ascisco ullam decor accendo voluptatem vehemens.',
    '15.101.468-1',
    '775930424'
  ),
  (
    'pedro.montanopena63@hotmail.com',
    '$2b$10$fzYw0jw7MTeSQK7yxjA2E.B7D2Chh7zCi8sFKpCt.NIxZlOVd7mrK',
    'Pedro Montaño Peña',
    26,
    3,
    'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/54.jpg',
    'Censura vix vociferor uxor.',
    '22.421.239-8',
    '668518938'
  ),
  (
    'victor.cabansalas34@gmail.com',
    '$2b$10$fzYw0jw7MTeSQK7yxjA2E.B7D2Chh7zCi8sFKpCt.NIxZlOVd7mrK',
    'Víctor Cabán Salas',
    56,
    3,
    'https://avatars.githubusercontent.com/u/12339104',
    'Volva uredo comedo clarus peccatus arca cito valens.',
    '18.692.405-9',
    '996900549'
  ),
  (
    'ariadna.trejoortiz74@gmail.com',
    '$2b$10$fzYw0jw7MTeSQK7yxjA2E.B7D2Chh7zCi8sFKpCt.NIxZlOVd7mrK',
    'Ariadna Trejo Ortiz',
    49,
    2,
    'https://avatars.githubusercontent.com/u/99806253',
    'Voluptate uxor universe vinco claudeo careo sed.',
    '16.403.792-4',
    '291651053'
  ),
  (
    'alejandro_saldivarelizondo@hotmail.com',
    '$2b$10$fzYw0jw7MTeSQK7yxjA2E.B7D2Chh7zCi8sFKpCt.NIxZlOVd7mrK',
    'Alejandro Saldivar Elizondo',
    46,
    1,
    'https://avatars.githubusercontent.com/u/57853540',
    'Appono celo creta quam sordeo assentator cohibeo.',
    '21.361.742-9',
    '393067712'
  ),
  (
    'patricia.rosalesalonzo@yahoo.com',
    '$2b$10$fzYw0jw7MTeSQK7yxjA2E.B7D2Chh7zCi8sFKpCt.NIxZlOVd7mrK',
    'Patricia Rosales Alonzo',
    47,
    2,
    'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/27.jpg',
    'Apud vicissitudo distinctio cogo demitto.',
    '14.175.852-3',
    '948549011'
  ),
  (
    'josemaria.espinosadelosmonterosvaldez@yahoo.com',
    '$2b$10$fzYw0jw7MTeSQK7yxjA2E.B7D2Chh7zCi8sFKpCt.NIxZlOVd7mrK',
    'José María Espinosa de los Monteros Valdez',
    36,
    1,
    'https://avatars.githubusercontent.com/u/25905604',
    'Quia copia subiungo.',
    '22.985.932-6',
    '173910080'
  ),
  (
    'josep_perezalonso@yahoo.com',
    '$2b$10$fzYw0jw7MTeSQK7yxjA2E.B7D2Chh7zCi8sFKpCt.NIxZlOVd7mrK',
    'Josep Pérez Alonso',
    23,
    3,
    'https://avatars.githubusercontent.com/u/40303208',
    'Auctor quos ventus capitulus asper theca anser voluptatum.',
    '19.932.726-9',
    '196310297'
  ),
  (
    'leticia_montalvocervantes@gmail.com',
    '$2b$10$fzYw0jw7MTeSQK7yxjA2E.B7D2Chh7zCi8sFKpCt.NIxZlOVd7mrK',
    'Leticia Montalvo Cervantes',
    33,
    2,
    'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/96.jpg',
    'Valetudo thesaurus vestigium adhaero soleo amita tabula crudelis cernuus tristis.',
    '13.882.620-5',
    '445222089'
  ),
  (
    'claudia.quintananajera28@hotmail.com',
    '$2b$10$fzYw0jw7MTeSQK7yxjA2E.B7D2Chh7zCi8sFKpCt.NIxZlOVd7mrK',
    'Claudia Quintana Nájera',
    36,
    2,
    'https://avatars.githubusercontent.com/u/95813090',
    'Tutamen deporto capillus molestias eos.',
    '13.118.954-7',
    '694803731'
  ),
  (
    'catalina_verduzcoorozco@gmail.com',
    '$2b$10$fzYw0jw7MTeSQK7yxjA2E.B7D2Chh7zCi8sFKpCt.NIxZlOVd7mrK',
    'Catalina Verduzco Orozco',
    20,
    2,
    'https://avatars.githubusercontent.com/u/65332147',
    'Ager ancilla adhuc decimus condico cedo delicate chirographum adduco.',
    '17.777.220-9',
    '832983341'
  ),
  (
    'clemente.quesadatrevino96@hotmail.com',
    '$2b$10$fzYw0jw7MTeSQK7yxjA2E.B7D2Chh7zCi8sFKpCt.NIxZlOVd7mrK',
    'Clemente Quesada Treviño',
    38,
    3,
    'https://avatars.githubusercontent.com/u/76126000',
    'Consectetur comparo tristis patior vociferor celo super.',
    '29.961.742-1',
    '609247959'
  ),
  (
    'ernesto.castellanosmartinez@gmail.com',
    '$2b$10$fzYw0jw7MTeSQK7yxjA2E.B7D2Chh7zCi8sFKpCt.NIxZlOVd7mrK',
    'Ernesto Castellanos Martínez',
    45,
    3,
    'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/41.jpg',
    'Quos comes suus copia.',
    '16.119.448-1',
    '589118973'
  );

-- Insertar ubicaciones
INSERT INTO User_Location (user_id, latitude, longitude) VALUES
  (1, -33.43647549434596, -70.67149234068621),
  (2, -33.43307450848761, -70.65108077959471),
  (3, -33.464811526875614, -70.6608256754916),
  (4, -33.43299269830379, -70.66972581622869),
  (5, -33.46084916211754, -70.62588405625016),
  (6, -33.47212049660598, -70.62332836764544),
  (7, -33.445335451050894, -70.64725626391072),
  (8, -33.46933452395966, -70.62877882345398),
  (9, -33.4462896837913, -70.65687853307963),
  (10, -33.44644199182912, -70.68106709541246),
  (11, -33.45121209743933, -70.64670939220066),
  (12, -33.47993340275884, -70.6309760267758),
  (13, -33.46308200350993, -70.62760273584922),
  (14, -33.44475147850677, -70.66511933207589),
  (15, -33.47426170627745, -70.62243582433403),
  (16, -33.455767368437414, -70.64494197791687),
  (17, -33.46857865923327, -70.6218299812738),
  (18, -33.44450852299064, -70.67931578715998),
  (19, -33.425723154034394, -70.63519598669875),
  (20, -33.45767131662026, -70.62988559321094);
