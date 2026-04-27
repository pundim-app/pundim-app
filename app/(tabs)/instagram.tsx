import { ScrollView, Text, View, TouchableOpacity, Image, StyleSheet, Linking, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';

interface InstagramPost {
  id: string;
  caption: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL';
  media_url: string;
  permalink: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
}

export default function InstagramScreen() {
  const colors = useColors();
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadInstagramPosts();
  }, []);

  async function loadInstagramPosts() {
    try {
      setLoading(true);
      setError(null);

      // Tenta carregar posts do servidor
      const response = await fetch('/api/instagram/posts');
      
      if (!response.ok) {
        throw new Error('Erro ao carregar posts do Instagram');
      }

      const data = await response.json();
      setPosts(data.posts || []);
    } catch (err) {
      console.error('Erro ao carregar Instagram:', err);
      setError('Não foi possível carregar os posts. Tente novamente mais tarde.');
      
      // Carrega posts de exemplo
      setPosts(EXAMPLE_POSTS);
    } finally {
      setLoading(false);
    }
  }

  function openInstagram() {
    Linking.openURL('https://www.instagram.com/pundim.jundiai/');
  }

  if (loading) {
    return (
      <ScreenContainer className="justify-center items-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <View className="p-6 gap-4 bg-background">
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">Instagram</Text>
            <Text className="text-sm text-muted">Acompanhe nossos posts</Text>
          </View>

          <TouchableOpacity
            style={[styles.instagramButton, { backgroundColor: colors.primary }]}
            onPress={openInstagram}
          >
            <Text style={styles.instagramButtonText}>📷 Seguir @pundim.jundiai</Text>
          </TouchableOpacity>
        </View>

        {/* Posts Grid */}
        <View className="p-4 gap-4">
          {error && (
            <View className="p-4 bg-error rounded-lg gap-2">
              <Text className="text-sm text-white font-semibold">⚠️ Aviso</Text>
              <Text className="text-sm text-white">{error}</Text>
            </View>
          )}

          {posts.length === 0 ? (
            <View className="items-center gap-4 py-12">
              <Text className="text-lg font-semibold text-foreground">Nenhum post encontrado</Text>
              <Text className="text-sm text-muted text-center">
                Siga-nos no Instagram para ver os últimos posts!
              </Text>
              <TouchableOpacity
                style={[styles.instagramButton, { backgroundColor: colors.primary }]}
                onPress={openInstagram}
              >
                <Text style={styles.instagramButtonText}>Ir para Instagram</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="gap-4">
              {posts.map((post) => (
                <TouchableOpacity
                  key={post.id}
                  onPress={() => Linking.openURL(post.permalink)}
                  activeOpacity={0.8}
                >
                  <View className="bg-surface rounded-2xl overflow-hidden border border-border">
                    {/* Imagem */}
                    {post.media_url && (
                      <Image
                        source={{ uri: post.media_url }}
                        style={styles.postImage}
                      />
                    )}

                    {/* Legenda e Info */}
                    <View className="p-4 gap-3">
                      {post.caption && (
                        <Text
                          numberOfLines={3}
                          className="text-sm text-foreground leading-relaxed"
                        >
                          {post.caption}
                        </Text>
                      )}

                      {/* Stats */}
                      <View className="flex-row gap-4 pt-2 border-t border-border">
                        {post.like_count !== undefined && (
                          <View className="flex-row items-center gap-1">
                            <Text className="text-lg">❤️</Text>
                            <Text className="text-xs text-muted font-semibold">
                              {formatNumber(post.like_count)}
                            </Text>
                          </View>
                        )}
                        {post.comments_count !== undefined && (
                          <View className="flex-row items-center gap-1">
                            <Text className="text-lg">💬</Text>
                            <Text className="text-xs text-muted font-semibold">
                              {formatNumber(post.comments_count)}
                            </Text>
                          </View>
                        )}
                        <View className="flex-row items-center gap-1 ml-auto">
                          <Text className="text-xs text-muted">
                            {formatDate(post.timestamp)}
                          </Text>
                        </View>
                      </View>

                      {/* CTA */}
                      <TouchableOpacity
                        style={[styles.viewButton, { backgroundColor: colors.primary }]}
                        onPress={() => Linking.openURL(post.permalink)}
                      >
                        <Text style={styles.viewButtonText}>Ver no Instagram →</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

// Posts de exemplo para quando a API não está disponível
const EXAMPLE_POSTS: InstagramPost[] = [
  {
    id: '1',
    caption: 'Pudim Tradicional 🍮 O clássico que nunca decepciona! Cremoso, sem furinhos e feito com amor.',
    media_type: 'IMAGE',
    media_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop',
    permalink: 'https://www.instagram.com/pundim.jundiai/',
    timestamp: new Date().toISOString(),
    like_count: 234,
    comments_count: 12,
  },
  {
    id: '2',
    caption: 'Pudim de Doce de Leite ✨ Cremoso com calda especial. Pronta entrega em 120ml!',
    media_type: 'IMAGE',
    media_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop',
    permalink: 'https://www.instagram.com/pundim.jundiai/',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    like_count: 189,
    comments_count: 8,
  },
];

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Hoje';
  } else if (diffDays === 1) {
    return 'Ontem';
  } else if (diffDays < 7) {
    return `${diffDays}d atrás`;
  } else if (diffDays < 30) {
    return `${Math.floor(diffDays / 7)}w atrás`;
  } else {
    return `${Math.floor(diffDays / 30)}m atrás`;
  }
}

const styles = StyleSheet.create({
  instagramButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  instagramButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  postImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
  },
  viewButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
