import { supabase } from "../supabase";

// Generic CRUD operations
export async function fetchData<T>(
  table: string,
  select: string = "*",
  filters?: Record<string, any>
): Promise<T[]> {
  let query = supabase.from(table).select(select);

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function insertData<T>(
  table: string,
  data: Partial<T>
): Promise<T> {
  const { data: result, error } = await supabase
    .from(table)
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function updateData<T>(
  table: string,
  id: string | number,
  data: Partial<T>
): Promise<T> {
  const { data: result, error } = await supabase
    .from(table)
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function deleteData(
  table: string,
  id: string | number
): Promise<void> {
  const { error } = await supabase.from(table).delete().eq("id", id);

  if (error) throw error;
}

// File upload utilities
export async function uploadFile(
  bucket: string,
  path: string,
  file: File
): Promise<string> {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file);

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);

  return publicUrl;
}

export async function deleteFile(bucket: string, path: string): Promise<void> {
  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) throw error;
}

// Real-time subscriptions
export function subscribeToChanges<T>(
  table: string,
  callback: (payload: any) => void,
  filters?: Record<string, any>
) {
  let query = supabase
    .channel(`${table}_changes`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: table,
        filter: filters ? `(${Object.keys(filters).join(",")})` : undefined,
      },
      callback
    )
    .subscribe();

  return () => {
    supabase.removeChannel(query);
  };
}
