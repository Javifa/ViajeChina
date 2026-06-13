import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { places } from '../src/data/places';
import { checklist } from '../src/data/checklist';
import { itinerary } from '../src/data/itinerary';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables! Ensure .env is present with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log('Seeding Database...');

  try {
    // 1. Seed Places
    console.log('Seeding places...');
    const { error: placesError } = await supabase.from('places').upsert(
      places.map(p => ({
        id: p.id,
        city_id: p.cityId,
        name: p.name,
        description: p.description,
        duration: p.duration,
        interest_level: p.interestLevel,
        entry_price: p.entryPrice || 0,
        google_maps_url: p.googleMapsUrl || null,
        image_url: p.imageUrl || null,
        is_favorite: p.isFavorite || false,
        is_visited: p.isVisited || false,
        is_custom: p.isCustom || false
      }))
    );
    if (placesError) throw placesError;

    // 2. Seed Checklist
    console.log('Seeding checklist...');
    const { error: checklistError } = await supabase.from('checklist_items').upsert(
      checklist.map(c => ({
        id: c.id,
        category: c.category,
        text: c.text,
        done: c.done || false,
        is_custom: c.isCustom || false
      }))
    );
    if (checklistError) throw checklistError;

    // 3. Seed Itinerary
    console.log('Seeding itinerary...');
    const itineraryDays = itinerary.map(day => ({
      day: day.day,
      date: day.date,
      city: day.city,
      title: day.title,
      subtitle: day.subtitle || null,
      is_transit_day: day.isTransitDay || false,
      transit_from: day.transitFrom || null,
      transit_to: day.transitTo || null
    }));

    const { error: daysError } = await supabase.from('itinerary_days').upsert(itineraryDays);
    if (daysError) throw daysError;

    // 4. Seed Activities
    console.log('Seeding activities...');
    // Clear old activities to prevent duplicates since they use uuid
    await supabase.from('activities').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    const activities = itinerary.flatMap(day => 
      day.activities.map(act => ({
        day_id: day.day,
        time: act.time,
        title: act.title,
        description: act.description || null,
        type: act.type,
        icon: act.icon,
        cost: act.cost || 0
      }))
    );

    const { error: actsError } = await supabase.from('activities').insert(activities);
    if (actsError) throw actsError;

    console.log('✅ Seeding complete!');

  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

seed();
