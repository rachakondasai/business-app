create table if not exists sales (
    id uuid primary key default gen_random_uuid(),
    session text not null,
    item text not null,
    image_url text,
    created_at timestamp with time zone default now()
);

create index if not exists idx_sales_created_at on sales(created_at);