# 📘 Tutorial: Criando e Configurando um Projeto Angular 19 – `app-pagamentos`

---

## ✅ Pré-requisitos

Antes de iniciar, verifique se você possui os seguintes itens instalados no seu sistema:

### 1. Verifique o Node.js
Execute o comando:
```bash
node -v
```
> ✔️ Versão recomendada: Node.js 18 ou superior  
> 🔗 Caso não esteja instalado: [https://nodejs.org](https://nodejs.org)

---

### 2. Instale o Angular CLI 19
Para instalar (ou atualizar) globalmente:
```bash
npm install -g @angular/cli@19
```

---

## ⚙️ Passo extra para usuários Windows – PowerShell

Se você estiver usando Windows, pode ser necessário permitir a execução de scripts no PowerShell para evitar erros ao usar comandos globais do `npm`.

Abra o PowerShell e execute:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

> ⚠️ Leia com atenção a mensagem exibida e confirme com `S` para aplicar.  
> Isso permite executar scripts locais e assinados remotamente no contexto do usuário atual.

---

## 🚀 Criando o Projeto Angular

### 3. Crie o projeto com o nome `app-pagamentos`
No terminal, execute:
```bash
ng new app-pagamentos
```

Durante a criação, o Angular CLI fará algumas perguntas. Responda:

- **Which stylesheet format would you like to use?**  
  → ✅ `SCSS` (ou outro de sua preferência)

- **Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)?**  
  → ❌ `No`

---

## 📁 Estrutura Inicial do Projeto

A estrutura de pastas e arquivos gerada com Angular 19 (standalone APIs) será similar a:

```
app-pagamentos/
├── src/
│   ├── app/
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── .editorconfig
├── .gitignore
├── angular.json
├── package-lock.json
├── package.json
└── README.md
```

> 📌 Note que esse projeto não utiliza `app.module.ts`, pois foi gerado com **Standalone Components**, `bootstrapApplication()` e `provideRouter()`.

---

## ▶️ Rodando o Projeto

### 4. Entre na pasta e inicie o servidor de desenvolvimento
```bash
cd app-pagamentos
ng serve
```

Acesse no navegador:
```
http://localhost:4200
```

---

## 🛠️ Configurações Iniciais Opcionais

### 5. Altere o título da aplicação

Edite o arquivo `src/index.html`:
```html
<title>App Pagamentos</title>
```

### 6. Personalize o conteúdo da tela inicial

Abra `src/app/app.component.html` e substitua o conteúdo por:
```html
<h1>Bem-vindo ao App de Pagamentos</h1>
```

---

## 💾 Salvando no Repositório Git

### 7. Inicialize um repositório local e faça o primeiro commit
```bash
git init
git add .
git commit -m "Projeto Angular 19 inicial: app-pagamentos"
git branch -M main
```

### 8. (Opcional) Conecte a um repositório remoto
```bash
git remote add origin https://github.com/seu-usuario/app-pagamentos.git
git push -u origin main
```

---

✅ **Pronto!** Seu projeto Angular 19 está criado, configurado e pronto para evoluir.  
