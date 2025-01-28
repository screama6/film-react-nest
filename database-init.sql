CREATE USER student WITH PASSWORD 'student'; 

CREATE database student WITH OWNER student;

GRANT ALL PRIVILEGES ON DATABASE student TO student; 

\c student postgres

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

SET ROLE student;

CREATE TABLE IF NOT EXISTS public.films
(
    id          uuid DEFAULT uuid_generate_v4() NOT NULL
        CONSTRAINT "PK_697487ada088902377482c970d1"
            PRIMARY KEY,
    rating      double precision                NOT NULL,
    director    varchar                         NOT NULL,
    tags        text                            NOT NULL,
    image       varchar                         NOT NULL,
    cover       varchar                         NOT NULL,
    title       varchar                         NOT NULL,
    about       varchar                         NOT NULL,
    description varchar                         NOT NULL
);

ALTER TABLE IF EXISTS public.films
    OWNER TO student;

CREATE TABLE IF NOT EXISTS public.schedules
(
    id       uuid DEFAULT uuid_generate_v4() NOT NULL
        CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd"
            PRIMARY KEY,
    daytime  varchar                         NOT NULL,
    hall     integer                         NOT NULL,
    rows     integer                         NOT NULL,
    seats    integer                         NOT NULL,
    price    double precision                NOT NULL,
    taken    text                            NOT NULL,
    "filmId" uuid
        CONSTRAINT "FK_1c2f5e637713a429f4854024a76"
            REFERENCES public.films
);

ALTER TABLE IF EXISTS public.schedules
    OWNER TO student;

INSERT INTO films("id","rating","director","tags","image","cover","title","about","description") VALUES('92b8a2a7-ab6b-4fa9-915b-d27945865e39',8.1,'Амелия Хьюз','Рекомендуемые','/bg6s.jpg','/bg6c.jpg','Сон в летний день','Фэнтези-фильм о группе друзей попавших в волшебный лес, где время остановилось.','Причудливый фэнтези-фильм, действие которого происходит в волшебном лесу, где время остановилось. Группа друзей натыкается на это заколдованное царство и поначалу проникается беззаботным духом обитателей, но потом друзьям приходится разойтись. А как встретиться снова, если нет ни времени, ни места встречи?');
INSERT INTO films("id","rating","director","tags","image","cover","title","about","description") VALUES('0354a762-8928-427f-81d7-1656f717f39c',9.5,'Оливер Беннет','Рекомендуемые','/bg4s.jpg','/bg4c.jpg','Парадокс Нексуса','Фильм об эксперименте по соединению человеческих умов. Исследует вопросы неприкосновенности частной жизни, идентичности и самой природы человеческого сознания','В фильме исследуются последствия новаторского эксперимента по соединению человеческих умов. По мере развития проекта участники сталкиваются с вопросами неприкосновенности частной жизни, идентичности и самой природы человеческого сознания.');
INSERT INTO films("id","rating","director","tags","image","cover","title","about","description") VALUES('5b70cb1a-61c9-47b1-b207-31f9e89087ff',8.9,'Лила Васкес','Рекомендуемые','/bg2s.jpg','/bg2c.jpg','Стражи Гримуара','Фэнтезийное приключение об истинном значении дружбы, мужества и силы знаний','Захватывающее фэнтезийное приключение, которое рассказывает о группе героев, которые должны защитить древний магический том от попадания в руки тёмного колдуна. История об истинном значении дружбы, мужества и силы знаний.');
INSERT INTO films("id","rating","director","tags","image","cover","title","about","description") VALUES('3bedbc5a-844b-40eb-9d77-83b104e0cf75',8.5,'Элиза Уиттакер','Рекомендуемые','/bg5s.jpg','/bg5c.jpg','Звёздное путешествие','Научно-фантастический фильм о команде астронавтов, исследующий темы жизнестойкости, надежды и силы человеческих связей','«Звёздное путешествие» — прекрасный научно-фантастический фильм о команде астронавтов, путешествующих по галактике в поисках нового дома для человечества. Помимо потрясающей работы оператора и специалистов по визуальным эффектам, можно отметить темы, исследуемые в фильме: жизнестойкости, надежды и силы человеческих связей.');
INSERT INTO films("id","rating","director","tags","image","cover","title","about","description") VALUES('51b4bc85-646d-47fc-b988-3e7051a9fe9e',9,'Харрисон Рид','Рекомендуемые','/bg3s.jpg','/bg3c.jpg','Недостижимая утопия','Провокационный фильм-антиутопия, исследующий темы свободы, контроля и цены совершенства.','Провокационный фильм-антиутопия режиссера Харрисона Рида. Действие фильма разворачивается в, казалось бы, идеальном обществе, и рассказывает о группе граждан, которые начинают подвергать сомнению систему. Фильм исследует темы свободы, контроля и цены совершенства.');
INSERT INTO films("id","rating","director","tags","image","cover","title","about","description") VALUES('0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',2.9,'Итан Райт','Документальный','/bg1s.jpg','/bg1c.jpg','Архитекторы общества','Документальный фильм, исследующий влияние искусственного интеллекта на общество и этические, философские и социальные последствия технологии.','Документальный фильм Итана Райта исследует влияние технологий на современное общество, уделяя особое внимание роли искусственного интеллекта в формировании нашего будущего. Фильм исследует этические, философские и социальные последствия гонки технологий ИИ и поднимает вопрос: какой мир мы создаём для будущих поколений.');

INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('f2e429b0-685d-41f8-a8cd-1d8cb63b99ce', '2024-06-28T10:00:53+03:00', 0, 5, 10, 350, '', '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('5beec101-acbb-4158-adc6-d855716b44a8', '2024-06-28T14:00:53+03:00', 1, 5, 10, 350, '', '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('d6a4ed9b-51d6-4df2-b66e-d75175deb373', '2024-06-29T11:00:53+03:00', 0, 5, 10, 350, '', '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('a8af36c3-65ee-4224-a77d-c9ebb790ba66', '2024-06-29T15:00:53+03:00', 1, 5, 10, 350, '', '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('0cf8b68c-fcf2-4c0a-97ba-45990231fa0e', '2024-06-29T17:00:53+03:00', 2, 5, 10, 350, '', '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('2519ca34-32b4-4a7f-971d-3bb585c6450b', '2024-06-30T12:00:53+03:00', 0, 5, 10, 350, '', '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('b105ad4b-ecd2-4556-abaf-9a95403dc01c', '2024-06-30T16:00:53+03:00', 1, 5, 10, 350, '', '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('02a9feb2-fc92-4386-a917-aa79e7f8fd7f', '2024-06-30T18:00:53+03:00', 2, 5, 10, 350, '', '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('9647fcf2-d0fa-4e69-ad90-2b23cff15449', '2024-06-28T10:00:53+03:00', 0, 5, 10, 350, '', '51b4bc85-646d-47fc-b988-3e7051a9fe9e');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('9f2db237-01d0-463e-a150-89f30bfc4250', '2024-06-28T14:00:53+03:00', 1, 5, 10, 350, '', '51b4bc85-646d-47fc-b988-3e7051a9fe9e');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('3d5f5d12-b4d8-44d3-a440-1b91616fda40', '2024-06-28T16:00:53+03:00', 2, 5, 10, 350, '', '51b4bc85-646d-47fc-b988-3e7051a9fe9e');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('7f59de0d-62b2-412f-9e0b-bf6e971c44e5', '2024-06-29T11:00:53+03:00', 0, 5, 10, 350, '', '51b4bc85-646d-47fc-b988-3e7051a9fe9e');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('65f4a65e-1bc1-4677-842b-10e9b317b287', '2024-06-29T15:00:53+03:00', 1, 5, 10, 350, '', '51b4bc85-646d-47fc-b988-3e7051a9fe9e');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('b3ba6b69-050e-498c-9cdb-92711d8e4180', '2024-06-29T17:00:53+03:00', 2, 5, 10, 350, '', '51b4bc85-646d-47fc-b988-3e7051a9fe9e');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('d87ee9ab-4d84-43bb-85d6-f71aced22f73', '2024-06-30T12:00:53+03:00', 0, 5, 10, 350, '', '51b4bc85-646d-47fc-b988-3e7051a9fe9e');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('eed1469f-c95e-428a-870d-13cbfe4ac2ac', '2024-06-30T16:00:53+03:00', 1, 5, 10, 350, '', '51b4bc85-646d-47fc-b988-3e7051a9fe9e');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('68437c84-6c35-4203-bff7-021d16042a6b', '2024-06-30T18:00:53+03:00', 2, 5, 10, 350, '', '51b4bc85-646d-47fc-b988-3e7051a9fe9e');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('351b437c-3430-4a35-b71d-b93b3d80274a', '2024-06-28T10:00:53+03:00', 0, 5, 10, 350, '', '3bedbc5a-844b-40eb-9d77-83b104e0cf75');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('2661b7e2-7654-4d17-aa5d-9da76e4fb563', '2024-06-28T14:00:53+03:00', 1, 5, 10, 350, '', '3bedbc5a-844b-40eb-9d77-83b104e0cf75');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('d155ff3f-d547-4e4d-a530-bfcdcb3efbd5', '2024-06-28T16:00:53+03:00', 2, 5, 10, 350, '', '3bedbc5a-844b-40eb-9d77-83b104e0cf75');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('baf5d315-f3ad-4ebc-bbdc-544c51f3a2f3', '2024-06-29T11:00:53+03:00', 0, 5, 10, 350, '', '3bedbc5a-844b-40eb-9d77-83b104e0cf75');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('5a102896-b6ac-4db1-9f93-1653dde8a5f2', '2024-06-29T15:00:53+03:00', 1, 5, 10, 350, '', '3bedbc5a-844b-40eb-9d77-83b104e0cf75');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('c06b2048-a159-4356-b51b-3d7817766d02', '2024-06-29T17:00:53+03:00', 2, 5, 10, 350, '', '3bedbc5a-844b-40eb-9d77-83b104e0cf75');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('ee489a8b-68be-48a1-b62f-896981d60b06', '2024-06-30T12:00:53+03:00', 0, 5, 10, 350, '', '3bedbc5a-844b-40eb-9d77-83b104e0cf75');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('a33f5fda-c4d8-4a1b-9f86-cd39d73fdc98', '2024-06-30T16:00:53+03:00', 1, 5, 10, 350, '', '3bedbc5a-844b-40eb-9d77-83b104e0cf75');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('24074084-1d42-49ff-b0fb-e64029674718', '2024-06-30T18:00:53+03:00', 2, 5, 10, 350, '', '3bedbc5a-844b-40eb-9d77-83b104e0cf75');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('793009d6-030c-4dd4-8d13-9ba500724b38', '2024-06-28T10:00:53+03:00', 0, 5, 10, 350, '3:3,1:4,1:5,1:3,1:2', '5b70cb1a-61c9-47b1-b207-31f9e89087ff');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('27a6c145-d5bf-4722-8bd9-b58c5b6b718f', '2024-06-28T14:00:53+03:00', 1, 5, 10, 350, '', '5b70cb1a-61c9-47b1-b207-31f9e89087ff');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('1f57131e-eb9c-41a2-b451-89ea7f691fb7', '2024-06-28T16:00:53+03:00', 2, 5, 10, 350, '', '5b70cb1a-61c9-47b1-b207-31f9e89087ff');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('bfd27e0e-3a21-465c-966c-c874da242875', '2024-06-29T11:00:53+03:00', 0, 5, 10, 350, '2:2,2:3', '5b70cb1a-61c9-47b1-b207-31f9e89087ff');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('4ba7c6c6-33ba-4f1f-9a64-538d59d90c10', '2024-06-29T15:00:53+03:00', 1, 5, 10, 350, '', '5b70cb1a-61c9-47b1-b207-31f9e89087ff');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('e75cded8-ebad-4286-9e3e-b3e852916f8c', '2024-06-29T17:00:53+03:00', 2, 5, 10, 350, '', '5b70cb1a-61c9-47b1-b207-31f9e89087ff');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('516f87d0-8a36-4663-a079-1e9695b9a412', '2024-06-30T12:00:53+03:00', 0, 5, 10, 350, '', '5b70cb1a-61c9-47b1-b207-31f9e89087ff');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('3573d55b-9a7f-484b-a0e0-b204af6d86d0', '2024-06-30T16:00:53+03:00', 1, 5, 10, 350, '', '5b70cb1a-61c9-47b1-b207-31f9e89087ff');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('208ec902-8955-4a52-bdc3-a6ff04602ed9', '2024-06-30T18:00:53+03:00', 2, 5, 10, 350, '', '5b70cb1a-61c9-47b1-b207-31f9e89087ff');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('d3f54ca3-8e19-4b63-afd4-6a8d03933339', '2024-06-28T10:00:53+03:00', 0, 5, 10, 350, '', '0354a762-8928-427f-81d7-1656f717f39c');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('2d794723-eadc-43ea-b82b-268f0178fb43', '2024-06-28T14:00:53+03:00', 1, 5, 10, 350, '', '0354a762-8928-427f-81d7-1656f717f39c');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('043eb8fb-454a-40d2-9ce9-6fe80072bf8b', '2024-06-28T16:00:53+03:00', 2, 5, 10, 350, '', '0354a762-8928-427f-81d7-1656f717f39c');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('aa366df5-f035-43ec-8088-87e042110f3d', '2024-06-29T11:00:53+03:00', 0, 5, 10, 350, '', '0354a762-8928-427f-81d7-1656f717f39c');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('87b49000-5481-49d1-b481-b4f416f3e9bb', '2024-06-29T15:00:53+03:00', 1, 5, 10, 350, '', '0354a762-8928-427f-81d7-1656f717f39c');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('9c1bd824-2330-4a8e-ab9d-6ac2180c9c5e', '2024-06-29T17:00:53+03:00', 2, 5, 10, 350, '', '0354a762-8928-427f-81d7-1656f717f39c');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('20778761-4041-4a71-bf9f-0bfd63930ae8', '2024-06-30T12:00:53+03:00', 0, 5, 10, 350, '', '0354a762-8928-427f-81d7-1656f717f39c');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('2aa2877b-9c15-4f56-8eea-936cfda5890a', '2024-06-30T16:00:53+03:00', 1, 5, 10, 350, '', '0354a762-8928-427f-81d7-1656f717f39c');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('53d4d8a0-d79f-4485-b4ce-ffc3a75540cb', '2024-06-30T18:00:53+03:00', 2, 5, 10, 350, '', '0354a762-8928-427f-81d7-1656f717f39c');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('5274c89d-f39c-40f9-bea8-f22a22a50c8a', '2024-06-28T10:00:53+03:00', 0, 5, 10, 350, '', '92b8a2a7-ab6b-4fa9-915b-d27945865e39');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('3f7ed030-230c-4b06-bfc7-eeaee7f3f79b', '2024-06-28T14:00:53+03:00', 1, 5, 10, 350, '', '92b8a2a7-ab6b-4fa9-915b-d27945865e39');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('8e8c2627-4578-42b1-a59a-9ec4964a03e1', '2024-06-28T16:00:53+03:00', 2, 5, 10, 350, '', '92b8a2a7-ab6b-4fa9-915b-d27945865e39');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('940e657a-69fa-4f71-a48e-3c064dcb61fd', '2024-06-29T11:00:53+03:00', 0, 5, 10, 350, '', '92b8a2a7-ab6b-4fa9-915b-d27945865e39');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('ffde1149-dbc7-49b2-964d-a8de6a45709c', '2024-06-29T15:00:53+03:00', 1, 5, 10, 350, '', '92b8a2a7-ab6b-4fa9-915b-d27945865e39');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('6a0d0a68-2f74-4164-aac5-45e0e07adb86', '2024-06-29T17:00:53+03:00', 2, 5, 10, 350, '', '92b8a2a7-ab6b-4fa9-915b-d27945865e39');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('9d3d3914-ea59-46a0-80a2-4e320e82956a', '2024-06-30T12:00:53+03:00', 0, 5, 10, 350, '', '92b8a2a7-ab6b-4fa9-915b-d27945865e39');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('5c68663d-1a71-401c-9214-e79af571c347', '2024-06-30T16:00:53+03:00', 1, 5, 10, 350, '', '92b8a2a7-ab6b-4fa9-915b-d27945865e39');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('2644a72a-6f17-4c61-a405-9c48bb0ea682', '2024-06-30T18:00:53+03:00', 2, 5, 10, 350, '', '92b8a2a7-ab6b-4fa9-915b-d27945865e39');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") VALUES ('89ee32f3-8164-40a6-b237-f4d492450250', '2024-06-28T16:00:53+03:00', 2, 5, 10, 350, ',1:1,2:1', '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf');