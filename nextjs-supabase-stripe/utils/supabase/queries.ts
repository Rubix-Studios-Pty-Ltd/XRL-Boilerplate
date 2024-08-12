import { SupabaseClient } from '@supabase/supabase-js';
import { cache } from 'react';

export const getUser = cache(async (supabase: SupabaseClient) => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error('Error fetching user:', error.message);
      return null;
    }
    return user;
  } catch (error) {
    console.error('Unexpected error fetching user:', error);
    return null;
  }
});

export const getSubscription = cache(async (supabase: SupabaseClient) => {
  try {
    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .maybeSingle();
    if (error) {
      console.error('Error fetching subscription:', error.message);
      return null;
    }
    return subscription;
  } catch (error) {
    console.error('Unexpected error fetching subscription:', error);
    return null;
  }
});

export const getProducts = cache(async (supabase: SupabaseClient) => {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*, prices(*)')
      .eq('active', true)
      .eq('prices.active', true)
      .order('metadata->index')
      .order('unit_amount', { referencedTable: 'prices' });
    if (error) {
      console.error('Error fetching products:', error.message);
      return [];
    }
    return products;
  } catch (error) {
    console.error('Unexpected error fetching products:', error);
    return [];
  }
});

export const getUserDetails = cache(async (supabase: SupabaseClient) => {
  const { data: userDetails } = await supabase
    .from('users')
    .select('*')
    .single();

  return userDetails;
});
