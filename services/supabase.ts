import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '~utils/supabase';
import Toast from 'react-native-toast-message';

// TODO: ADD ERROR TOAST WHEN ONE OF THESE FAILS

export const findOrCreateUser = async (email: string, uuid: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (!data) {
    await supabase.from('users').insert([
      {
        email,
        uuid,
      },
    ]);
  }

  return [data, error];
};

type ConversationData = {
  id: number;
  title: string;
};

export const getConversation = async (
  conversationId: number
): Promise<[data: ConversationData, error: PostgrestError | null]> => {
  const { data, error } = await supabase
    .from('conversations')
    .select('title, id')
    .eq('id', conversationId)
    .single();

  return [data as ConversationData, error];
};

export const getUserConversations = async (
  email: string,
  limit: number = 20
) => {
  const { data, error } = await supabase
    .from('conversations')
    .select('id, title, updated_at')
    .eq('user', email)
    .order('updated_at', { ascending: false })
    .limit(limit);

  return [data, error];
};

export const getConversationMessages = async (conversationId: number) => {
  const { data, error } = await supabase
    .from('messages')
    .select('prompt,response,id')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  return [data, error];
};

export const createConversation = async (
  title: string,
  email: string
): Promise<[data: ConversationData, error: PostgrestError | null]> => {
  const { data, error } = await supabase
    .from('conversations')
    .insert([
      {
        title,
        user: email,
      },
    ])
    .select('id, title')
    .single();

  return [data as ConversationData, error];
};

type CreateMessageParams = {
  prompt: string;
  response: string;
  conversationId: number;
  user: string;
};

export const createMessage = async ({
  prompt,
  response,
  conversationId,
  user,
}: CreateMessageParams) => {
  const { data, error } = await supabase
    .from('messages')
    .insert([
      {
        prompt,
        response,
        conversation_id: conversationId,
        user,
      },
    ])
    .select('id, prompt, response, conversation_id, user');

  return [data, error];
};

export const updateConversation = async ({
  conversationId,
  title,
}: {
  conversationId: number;
  title: string;
}) => {
  const { data, error } = await supabase
    .from('conversations')
    .update({ title, updated_at: new Date() })
    .eq('id', conversationId)
    .select('id, title, updated_at');

  return [data, error];
};
