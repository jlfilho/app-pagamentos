# ✅ Tutorial — Ajustando a Largura da Página

Este tutorial mostra como configurar a largura máxima de componentes específicos para melhorar a responsividade e centralização do conteúdo em telas grandes.

---

## 🎨 Organização do SCSS no Projeto

### 📁 1. **Arquivo:** `src/app/lancamentos/lancamentos.component.scss`

```scss
.container {
  padding: 24px;
  max-width: 800px;
  margin: auto;

  @media (min-width: 1600px) {
    width: 70%;
  }

  h1 {
    font-weight: bold;
  }

  .campo-descricao {
    width: 100%;
    margin-top: 16px;
  }

  .grupo-vencimento {
    display: flex;
    gap: 16px;
    margin-top: 16px;

    .campo-vencimento {
      flex: 1;
    }
  }

  .botao-pesquisar {
    margin-top: 16px;
  }
}

.tabela-container {
  margin: 24px;
  max-width: 800px;
  margin: auto;
  overflow-x: auto;
}
```

---

### 📁 2. **Arquivo:** `src/app/pessoas/pessoas/pessoas.component.scss`

```scss
.container {
  padding: 24px;
  max-width: 800px;
  margin: auto;

  @media (min-width: 1600px) {
    width: 70%;
  }

  h1 {
    font-weight: bold;
  }

  .campo-nome {
    width: 100%;
    margin-top: 16px;
  }

  .botao-pesquisar {
    margin-top: 16px;
  }
}

.tabela-container {
  margin: 24px;
  max-width: 800px;
  margin: auto;
  overflow-x: auto;
}
```

---

### 📁 3. **Arquivo:** `src/app/layout/layout.component.scss`

```scss
.layout {
  max-width: 1200px;
  margin: auto;

  .sidenav-container {
    height: 90vh;
  }

  .content {
    padding: 24px;
  }
}
```

---

## 💾 Passo Final: Commit no GitHub

Após realizar as alterações, salve e envie para o repositório com os seguintes comandos:

```bash
git add .
git commit -m "Ajuste de largura nos componentes de layout"
git push -u origin main
```
