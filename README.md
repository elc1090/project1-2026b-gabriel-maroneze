# project1-2026b-gabriel-maroneze

------------------------------------------------
         README.md do Projeto
------------------------------------------------

Movie Search App is built using HTML, CSS, JavaScript & TMDB API.

- User can search any movie details.
- TMDB API is used to fetch movie details.
- It is completely responsive.
- It has dark mode option.
- It has clean UI.

------------------------------------------------
         README.md com base no Modelo
------------------------------------------------

# Projeto: Remake de aplicação web simples

> 1. Leia com atenção as instruções abaixo para editar este README em formato Markdown.
> 2. Substitua todos os trechos de texto iniciados com "Substitua" por informações do seu projeto, conforme solicitado em cada trecho.
> 3. Substitua a imagem animada por um GIF/WEBP mostrando o resultado do seu projeto (o arquivo pode ser armazenado no repositório ou em URL externa). 
> 4. Remova todas as instruções de entrega.
> 5. Renomeie esta arquivo para README.md e entregue-o dentro da pasta raiz do seu repositório de entrega. 
> 6. Double-check: Certifique-se de que seu README.md não contenha instruções de entrega e seja visualizado corretamente ao abrir seu repositório!
> Opcional: você pode alterar a formatação deste README, mas mantenha todas as informações solicitadas.

<img width="712" height="378" alt="CineMaro" src="https://github.com/user-attachments/assets/bd5c4b29-b921-4c52-9f47-84415db6d822" />


## Acesso

 https://elc1090.github.io/project1-2026b-gabriel-maroneze/


## Desenvolvedor(a)

Gabriel Maroneze Ramos (202512445) – Sistemas de Informação



## App original

### Links

- Acesso: https://movie-search-app-weld.vercel.app/
- Repositório: https://github.com/mmj030703/Movie-Search-App/

### Descrição

A aplicação original consistia em um site, feito em HTML, JavaScript e CSS que, através de uma API Key do TMDb, recolhia filmes e algumas de suas informações do site de origem (theMovieDatabase). Ele continha um switch para modo escuro/claro, uma barra de pesquisa com sugestão automática de filmes e os buscava de acordo com o título. Retornava dados como: Nome original, Cast de Atores, Avaliações do TMDb, Gêneros e uma pequena descrição.

O layout era simples e limpo, com pouquíssimos elementos

## Demanda do(a) cliente

### Cliente
Gabriel da Silva França

### Demanda
1.        Funcionalidades
- Lista de Filmes Favoritos. Usuário pode “Salvar nos Favoritos” (ícone de “estrela”/”coração”) por meio de botão ou remover da lista;
- Status de filme “Assistido” e Lista de Assistidos;
- Avaliar Filme: um filme só pode ser avaliado se já foi assistido;
- Informações adicionais (caso estejam disponíveis na TMDB API): Direção (Director); Duração (Runtime, formatado em horas e minutos, ex: 2h 15min); Classificação Indicativa destacada em cores diferentes (Certification, ex: L, 12, 14, 16, 18 anos);
2.        Alterações de interface visual e design (de livre escolha):
- Alterar tipografia e paleta de cores da interface;
- Padronizar com alguma biblioteca de ícones vetoriais;
- Usar a imagem de capa do filme como uma “cover” da página do filme com um filtro escuro na imagem;
- Estilizar Gêneros e Elenco de maneira mais clara e organizada.

## Desenvolvimento
**Dia 18/08/2026 (Período de Aula):** Fiz alterações visuais na identidade do site, sendo elas:
- Alteração da logo e tema principal do site
- Alteração do tema escuro do site
- Tradução de dados inicialmente expostos em inglês (fixos, HTML)


Estou buscando como adicionar diferentes tipos de caixas de texto para trabalhar em cima da Caixa de Pesquisa (necessita da criação de uma nova fonte) e para adicionar a capa dos filmes sob determinados efeitos visuais no background. Utilizei o chatGPT para adaptar a logo existente e o CanvaAI para remover o fundo da nova versão da imagem para utilização. A parte de colorações e alteração de textos já era de meu conhecimento prévio (única coisa que me recordo em html/css que aprendi no 1°semestre kkkk)


**Dia 20/08/2026 (Período de Aula e pré-aula):** Adição de novas informações sobre cada filme, conforme solicitado na requisição
- Alteração dos arquivos Javascript e HTML para a funcionalidade de buscar o indicador de Conteúdo Adulto e Linguagem Original do filme
- Alteração do arquivo styleCSS para padronizar a aparição das informações conforme as demais já existentes
- Pós Aula: Acrescentei o botão para a aba de favoritos

  
**Dia 21/08/2026:**
- Adição do botão com a opção de favoritar filmes


**Dia 23/08/2026:**
- Adição da parte de localstorage para armazenar os filmes favoritos
- Replicação da lógica/funções da lista de filmes favoritos para acrescentar a lista de filmes assistidos, adaptando as necessidades
- Problemas com alterações visuais e bugs que quebraram o funcionamento do site com as novas adições
- Uso forte do chatGPT para corrigir os erros gerados anteriormente - má implementação da parte de local storage causou tais erros, precisei recorrer ao GPT para fazer uma varredura dos erros e me informar onde corrigi-los. Também deixei os botões sobrescritos anteriormente sem querer, usei o chat para me ajudar com o alinhamento.
- Adição da opção para dar uma avaliação pessoal do usuário (1 – 10 estrelas), garantindo que essa só apareça caso o filme esteja marcado na lista de Assistidos. Também uso do localStorage para armazenar os dados 


### Processo

Inicialmente eu tentei ler o código de cabo a rabo para entender melhor seu funcionamento. Algumas funções mais básicas de Javascript (como o botão de modo escuro) e as partes de HTML/CSS eu consegui compreender mais facilmente por causa do curso de Desenvolvimento Web do PET SI que participei. 

A parte da API e busca de dados por ela, entendi de forma bem abstrata, assim como algumas das funções mais complexas. Essas partes, posteriormente eu solicitei ao ChatGPT para me entregar explicações sobre o conteúdo utilizando todos os conceitos que apareciam no código anteriormente. 

Para adicionar os botões de favoritos/assistidos, foi bem tranquilo, porque ainda lembrava do básico sobre esse tipo de implementação. Precisei recorrer a ajuda em função do localStorage, a implementação desses botões para cada filme que aparecesse (tentei fazer sozinho e acabei incluindo errado no HTML, dando erros ao buscar os filmes).

Além das dificuldades acima, também apanhei um pouco para adicionar os elementos nas posições corretas. Algumas versões do projeto ficaram com sobreposição de botões, imagens e até mesmo a logo foi interpretada como parte da divisória dos botões de favoritos durante um momento. Precisei de apoio do GPT para corrigir e deixar as partições simétricas e bem encaixadas.

Fiz as alterações no CSS para a aparência geral do site tranquilamente logo no início do projeto (mudança de modo escuro, cores, textos, etc).

Ficou faltando a implementação de uma forma de puxar o diretor e classificação indicatória dos filmes, que não encontrei na API. Em compensação, adicionei infos de Idioma Original e Sinalizador de Conteúdo Adulto.

Também não mexi com outras bibliotecas vetoriais porque o projeto já contava com a utilização da Font Awesome. Não senti a necessidade de buscar por novas para a implementação e meu tempo ficou curto também kkk

Por fim, não incluí a imagem de capa do filme como "plano de fundo" para as informações de cada filme porque encontrei dificuldades em aplicar o filtro de embaçamento/escurecimento de imagens, bem como tratar a mudança da cor da fonte de cada letra caso uma única cor fixa ficasse ruim em certos casos. Meu tempo ficou curto pra pesquisar mais afundo sobre isso, mas seria meu próximo passo.

### Trechos de código

<img width="1265" height="612" alt="Captura de tela 2026-08-24 140832" src="https://github.com/user-attachments/assets/8e3d4a4c-c031-4a84-b5b6-d6cb05fecc85" />


<img width="1240" height="713" alt="Captura de tela 2026-08-24 140743" src="https://github.com/user-attachments/assets/b64b7e4c-9022-4e4c-91d9-2e53ca54d454" />


<img width="1247" height="622" alt="Captura de tela 2026-08-24 140643" src="https://github.com/user-attachments/assets/31c6768d-8f5f-4176-b668-98366b14f9ef" />




## Tecnologias

### Linguagens e afins

- Linguagens: HTML, JavaScript, CSS
- API de Dados: TMDB API (original do projeto)
- API para Armazenamento: LocalStorage (fornecida pelo navegador)
- Biblioteca vetorial: Font Awesome 6.5.1 (original do projeto)
- CDN: cdnjs (original do projeto)
- IA: ChatGPT

### Ambiente de desenvolvimento

- Código desenvolvido usando o vsCode com as extensões: Django, Elm, GitHub Actions, GitHub Pull Requests, GitHub Codespaces, JSON Crack, Test Adapter Converter, Test Explorer UI;
- IA Generativa utilizada no desenvolvimento: (ChatGPT Workspace);
- IA utilizada para refinamento da logo: CanvaAI;

## Referências e créditos

Principal material de aprendizado utilizado foi o próprio ChatGPT
A nova imagem (logomarca) do site foi gerada a partir da logo original e transformada por intermédio do ChatGPT.
Exemplos de Prompts que utilizei para reaprender/aprender conceitos básicos de HTML, JavaScript e CSS que já estavam implementados no código original:
1.	Chat, preciso que você me explique os três arquivos de maneira separada.
 Estou estudando sobre Desenvolvimento Web na faculdade e para aprender sobre HTML, CSS e JavaScript, me foi dada a tarefa de analisar e recriar um site (já estou no processo das alterações visuais com o que estou enviando os arquivos).
Para isso, preciso que você me apresente cada parte desses arquivos com explicações sobre as funcionalidades usadas nela. Fale sobre até mesmo os aspectos mais básicos e funcionais da linguagem, como atribuição de variável, estruturas condicionais e de repetição, entre outras funcionalidades como por exemplo a integração entre os arquivos e questões de servidor/cliente
2.	Chat, agora vamos adicionar o sistema de armazenamento local no localStorage. Ainda siga o mesmo modelo de ensino para a parte de desenvolvimento web.
Utilizei o GPT tanto para a aplicação do LocalStorage, quanto para me explicar sua funcionalidade para a parte de Favoritos (implementada inicialmente). Para a parte de Filmes Assistidos, consegui implementar por conta própria após entender o funcionamento do código

---
Projeto entregue para a disciplina de [Desenvolvimento de Software para a Web](http://github.com/andreainfufsm/elc1090-2026b) em 2026b


