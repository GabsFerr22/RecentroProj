# Projeto Unificando o Centro com a Recentro


<div align="center">
  
![LogoRecentro](/ProjetoCompartilhado/FrontMapa/src/page/imgs/IMGGITHUBRECENTRO.png)
  
</div>

## O que é a Recentro

É uma iniciativa voltada para a revitalização do centro da cidade. O objetivo principal do projeto é transformar o centro do Recife em uma área mais vibrante, segura e atrativa tanto para moradores quanto para turistas. O projeto prevê a manutenção, cuidado, intervenções físicas  estruturantes e o desenvolvimento de processos sociais, culturais e econômicos necessários á transformação urbana sustentável e inclusiva do território do centro.


## Introdução ao Unificando o Centro

Falta de praticidade e plataformas integradas dificultam acesso a detalhes de imóveis no centro do Recife, prejudicando decisões informadas de compra ou investimento. Apartir deste ponto decidimos junto com a Recentro e o Porto Digital Criar plataforma digital integrada com mapeamento para acesso fácil a detalhes como valor histórico e proximidade com serviços, simplificando divulgação de moradias e apartamentos.

<div align="center">

![GifUniCentro](/ProjetoCompartilhado/FrontMapa/src/page/imgs/GifMapaUniCentro.gif)

</div>

## Guia De Inicio do UniCentro

Atualmente o projeto está em estado de Desenvolvimento, não possuindo forma de acessa-lo virtualmente, a unica forma de fazer isso é rodando ele localmente na sua máquina, por meio da instalação do ambiente necessário para executar o software (Nodejs, MySQL, React e suas dependencias).

<div align="center">

![Manutencao](/ProjetoCompartilhado/FrontMapa/src/page/imgs/Manutenção.jpg)

</div>

## Detalhamento 


Foi requisitado a nossa equipe a criação de um mapa interativo onde ficaria, por esse mapa, as localizações nos formatos de marcadores (Pin's) que ao clicado forneceria as informações necessarias para o usuario sobre o respectivo local disponivel, que por sua vez seria disposto e alterado por CRUD de acesso restrito para o pessoal da Recentro, onde por meio desta parte seria feito toda a manutenção das informações dos predios e implementações futuras. 


![GifUniCentro](/ProjetoCompartilhado/FrontMapa/src/page/imgs/GifMapaUniCentro.gif)
![CRUD](/ProjetoCompartilhado/FrontMapa/src/page/imgs/CRUDDocumentacao.png)
![Login](/ProjetoCompartilhado/FrontMapa/src/page/imgs/LoginDocumentacao.png)



## Ficha Tecnica


Foi utilizada para criação da plataforma: O NodeJs para o BackEnd com suas bibliotecas (Cors, Express, Axios, dotenv, ETC), React para criação do Front-End e suas bibliotecas (React Router Dom, React Toastify, FontAwesome, ETC), Para a criação do Mapa em si, foi utilizado a API externa: Pigeon Maps Demo, que nos ofereceu todo o tipo de ferramenta possivel para utilização de mapa e marcadores personalizados, Também foi Utilizado o Banco de Dados Relacional MySQL para criação e estrutaração do esquema de dados.


A estruturação das pastas e seus respectivos codigos Back-End:
![Estrutura](/ProjetoCompartilhado/FrontMapa/src/page/imgs/EstruturaPasta.png)


Modelo ER da esquematização de dados utilizado no Projeto:
![EstruturaDados](/ProjetoCompartilhado/FrontMapa/src/page/imgs/ERUniCentro.png)

Retorno do BD no Localhost:8800. Retorna todas as moradias utilizadas:
![LocalHost](/ProjetoCompartilhado/FrontMapa/src/page/imgs/LocalHost8800.png)

As rotas utilizadas no projeto para Moradias:
![Rotas](/ProjetoCompartilhado/FrontMapa/src/page/imgs/RotasMoradias.png)


## Anexos e Ajuda:

**Back-End:** Parte do desenvolvimento de um site ou aplicação que se refere à lógica de negócios, operações de banco de dados, autenticação de usuários, etc.



**Bibliotecas:** Conjuntos de funcionalidades e ferramentas prontas que facilitam o desenvolvimento de software.



**Node.js:**** Ambiente de execução de JavaScript no lado do servidor, permitindo a construção de aplicativos escaláveis.



**MySQL:** Sistema de gerenciamento de banco de dados relacional, usado para armazenar e gerenciar dados.



**React:** Biblioteca JavaScript para construção de interfaces de usuário, principalmente em aplicações de página única.



**CRUD:** Acrônimo para Create, Read, Update, Delete (Criar, Ler, Atualizar, Excluir) - operações básicas de manipulação de dados.



**Cors:** Biblioteca Node.js para permitir ou restringir solicitações de recursos entre diferentes domínios.



**Express:** Framework de aplicação web para Node.js, usado para construir APIs e aplicativos web.



**Axios:** Biblioteca para fazer requisições HTTP no navegador e no Node.js.



**dotenv:** Biblioteca para carregar variáveis de ambiente a partir de um arquivo .env.



**React Router Dom:** Biblioteca para roteamento em aplicações React.



**React Toastify:**** Biblioteca para exibir notificações de forma elegante em aplicações React.



**FontAwesome:** Biblioteca de ícones personalizáveis usados em websites e aplicativos.



**API (Application Programming Interface):** Conjunto de definições e protocolos para a construção e integração de software de aplicativos.



**Pigeon Maps Demo:** API para a utilização de mapas e marcadores personalizados.



**Banco de Dados Relacional:** Tipo de banco de dados que organiza dados em tabelas que podem ser relacionadas entre si.



**Modelo ER (Entidade-Relacionamento):** Diagrama que mostra as entidades em um sistema e os relacionamentos entre elas.



**Localhost:** Endereço de rede que refere-se à própria máquina utilizada para desenvolvimento e testes.



**Rotas:** Caminhos definidos em uma aplicação para acessar diferentes partes do sistema ou API.


### Tutoriais Utilizados para criação do Projeto: 

**CRUD**

[![Youtube](/ProjetoCompartilhado/FrontMapa/src/page/imgs/ytb.png)](https://www.youtube.com/watch?v=V0InsRBl_G4&pp=ygUNY3JlYXRpbmcgY3J1ZA%3D%3D)

**CRUD**

[![Youtube](/ProjetoCompartilhado/FrontMapa/src/page/imgs/ytb.png)](https://www.youtube.com/watch?v=CUsCMKXpBGE&pp=ygUNY3JlYXRpbmcgY3J1ZA%3D%3D)




**Autenticação**

[![Youtube](/ProjetoCompartilhado/FrontMapa/src/page/imgs/ytb.png)](https://www.youtube.com/watch?v=LjJFu6Y6MrU&t=187s&pp=ygUfYXV0ZW50aWNhw6fDo28gand0IG5vZGVqcyByZWFjdA%3D%3D)

**JWT**
[![Youtube](/ProjetoCompartilhado/FrontMapa/src/page/imgs/ytb.png)](https://www.youtube.com/watch?v=qEBoZ8lJR3k&pp=ygUfYXV0ZW50aWNhw6fDo28gand0IG5vZGVqcyByZWFjdA%3D%3D)

**Login**

[![Youtube](/ProjetoCompartilhado/FrontMapa/src/page/imgs/ytb.png)](https://www.youtube.com/watch?v=300AFps_XoY&pp=ygURcGlnZW9uIG1hcHMgcmVhY3Q%3D)




### Agradecimento e Equipe:

Com grande prazer desenvolvi esta aplicação, e fico feliz em poder cooperar com a Recentro para criação dessa plataforma e contando com ajuda da minha equipe pude desenvolver da melhor forma possivel.

### Equipe

João Gabriel F. (Desenvolverdor FullStack da Aplicação & Documentação)
Laysa Freitas (Desenvolvedora Front-End)
José Roberto (Desenvolvedor Back-End)
Julia de Andrade (BackLog e Apresentação)
Julio Santana (BackLog e Apresentação)
Leandro (Apoio e BackLog)
Jose Henrique (Apoio)
Isael G. (Apoio)
Guilherme (Apoio)



<div align="center">
  
![Prefeitura](/ProjetoCompartilhado/FrontMapa/src/page/imgs/Prefeitura.jpg)
  
</div>