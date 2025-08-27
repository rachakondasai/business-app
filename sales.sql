import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export async function GET() {
  const { data, error } = await supabase
    .from('sales')
    .select('id, item, session, timestamp')
    .order('timestamp', { ascending: true });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  const grouped = data.reduce((acc, sale) => {
    if (!acc[sale.session]) {
      acc[sale.session] = [];
    }
    acc[sale.session].push({
      id: sale.id,
      item: sale.item,
      timestamp: sale.timestamp,
    });
    return acc;
  }, {});

  return new Response(JSON.stringify(grouped), {
    headers: { 'Content-Type': 'application/json' },
  });
}