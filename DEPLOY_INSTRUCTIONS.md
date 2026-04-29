# 🚀 Instruções de Deploy - Pundim

## **Opção 1: Deploy Automático (Recomendado)**

Se você tem acesso ao terminal do seu PC com Git instalado:

```bash
cd /caminho/para/pundim-app
git remote add origin https://github.com/pundim-app/pundim-app.git
git branch -M main
git push -u origin main
```

Depois acesse: https://vercel.com/new e importe o repositório.

---

## **Opção 2: Upload Manual pelo GitHub Web**

1. Acesse: https://github.com/new
2. Crie um repositório chamado `pundim-app`
3. Deixe como **Public**
4. Clique em "Create repository"
5. Na página do repositório, clique em **"Add file"** → **"Upload files"**
6. Selecione todos os arquivos da pasta `pundim-app`
7. Clique em "Commit changes"

Depois acesse: https://vercel.com/new e importe o repositório.

---

## **Opção 3: Deploy no Vercel Direto**

Se você não quer usar GitHub:

1. Acesse: https://vercel.com/new
2. Clique em **"Deploy with Git"**
3. Selecione **"Other Git Service"**
4. Cole a URL do repositório
5. Clique em "Deploy"

---

## **Depois do Deploy**

Seu site estará disponível em:
- `https://pundim-app.vercel.app` (automático)
- Ou um domínio customizado que você configurar

O site ficará **sempre online, 24/7**, sem precisar de manutenção!

---

## **Atualizações Futuras**

Sempre que você quiser atualizar o site:

1. Faça as alterações nos arquivos
2. Faça commit: `git commit -am "Descrição das mudanças"`
3. Faça push: `git push origin main`
4. Vercel faz deploy automático em segundos!

---

**Dúvidas?** Me chama! 🎉
