    
create table users(
    user_id uuid default uuid_generate_v4() primary key,
    user_name varchar(128),
    password  varchar(128),
    email varchar(128) unique,
    role varchar(64) default 'user'
);

drop table if exists categories;
create table categories(
    category_id uuid default uuid_generate_v4() primary key,
    category_name varchar(128)
);
insert into categories(category_name) values('drinks');
insert into categories(category_name) values('foods');
insert into categories(category_name) values('things');

update categories set category_name = 'things' where category_id = '71ac4bf5-0572-4a99-b59c-fd273fc809de';


insert into users(user_name, password, email) values('Ahmad', crypt('1221', gen_salt('md5')), 'nodirsmailov0@gmail.com');
select * from users where password = crypt('1221', gen_salt('md5'));

drop table if exists insert_arcive;
create table insert_arcive(
    category_id uuid,
    created_name varchar(128),
    created_date timestamptz default current_timestamp
);

create or replace function createFn()
returns trigger
language plpgsql
as
$$
begin
    insert into insert_arcive(category_id, created_name) values(new.category_id, new.category_name);
    return new;
end
$$;


create trigger createTrigger
before insert
on categories
for each row
execute procedure createFn();

drop table if exists delete_category_archive;
create table delete_category_archive (
    category_id uuid,
    deleted_name varchar(128),
    deleted_time timestamptz default current_timestamp
);

create or replace function deleteCatFn()
returns trigger
language plpgsql
as
$$
begin
    insert into delete_category_archive(category_id, deleted_name) values(old.category_id, old.category_name);
    return new;
end
$$;

create trigger deleteCatTrigger
before delete 
on categories
for each row
execute procedure deleteCatFn();

drop table if exists updated_archive;
create table updated_archive(
    updated_id uuid,
    description text,
    updated_name timestamptz default current_timestamp
);

create or replace function updatedCateFn()
returns trigger
language plpgsql
as 
$$
begin
    if
        old.category_name != new.category_name
    then 
        insert into updated_archive(updated_id, description) values(old.category_id, old.category_name || ' ning nomi ' || new.category_name || ' ga o`zgardi');
    end if;       
    return new;
end
$$;

create trigger updateCateTrigger
before update
on categories
for each row
execute procedure updatedCateFn();

drop table if exists products;
create table products(
    product_id uuid default uuid_generate_v4(),
    category uuid,
    product_name varchar(256),
    product_price bigint ,
    foreign key(category) references categories(category_id)
);

insert into products(category, product_name, product_price) values('e6b4e83a-5afc-497b-acdc-e1dd8d43a5ad', 'CocaCola', 11000);

drop table if exists insertProduct_archive;
create table insertProduct_archive(
    created_id uuid,
    category uuid,
    created_name varchar(256),
    created_price bigint,
    created_time timestamptz default current_timestamp
);

create or replace function creteProductFn()
returns trigger
language plpgsql
as
$$
begin
    insert into insertProduct_archive(created_id, category, created_name, created_price) values(new.product_id, new.category, new.product_name, new.product_price);
    return new;
end
$$;

create trigger createProductTrigger
before insert
on products
for each row
execute procedure creteProductFn();

--UPDATE TABLE
drop table if exists updateProduct_archive;
create table updateProduct_archive(
    updated_id uuid,
    description varchar,
    updated_time timestamptz default current_timestamp
);

create or replace function updateProductFn()
returns trigger
language plpgsql
as
$$
begin
    if
        old.category != new.category 
    then    
        insert into updateProduct_archive(updated_id, description) values(old.product_id, old.category || ' isi ' ||  new.category || ' ga o`zgardi');
    elsif 
        old.product_name != new.product_name
    then
         insert into updateProduct_archive(updated_id, description) values(old.product_id, old.product_name || ' isi ' || new.product_name || ' ga o`zgardi');    
    elsif 
        old.product_price != new.product_price     
    then    
        insert into updateProduct_archive(updated_id, description) values(old.product_id, old.product_price || ' isi ' || new.product_price || ' ga o`zgardi');    
    end if;    
    return new;
end
$$;

create trigger updateProductTrigger
before update 
on products
for each row
execute procedure updateProductFn();

-- DELETE TABLE 
drop table if exists deleteProduct_archive;
create table deleteProduct_archive(
    deleted_id uuid,
    category uuid,
    deleted_name varchar(256),
    deleted_price bigint,
    deleted_time timestamptz default current_timestamp
);

create or replace function deleteProductFn()
returns trigger
language plpgsql
as
$$
begin
    insert into deleteProduct_archive(deleted_id, category, deleted_name, deleted_price) values(old.product_id, old.category, old.product_name, old.product_price);
    return old;
end
$$;

create trigger deleteProductTrigger
before delete
on products
for each row
execute procedure deleteProductFn();

DELETE FROM products where product_id = '04420ad6-700d-4725-8737-4f47ee948034';

select 
    p.product_id,
    p.product_name,
    p.product_price,
    c.category_name
from
    products as p
inner join 
    categories as c 
on 
    p.category = c.category_id;  

udate products set 
    category = case
        when $1 is null
            then category
                else $1
end,
   product_name = case
           when $2 is null or $2 = ''
               then product_name
                   else $2
end,
     product_price = case
           when $3 is null or $3 = 0
               then product_price
                   else $3
end,


