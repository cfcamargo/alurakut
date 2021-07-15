import React from 'react';
import MainGrid from '../src/componentes/MainGrid'
import Box from '../src/componentes/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraCommons';
import { ProfileRelationsBoxWrapper } from '../src/componentes/ProfileRelations';

// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};


function ProfileSidebar(propriedades) {
  return (

    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />

      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>


      <hr />

      <AlurakutProfileSidebarMenuDefault />

    </Box>
  )
}

function ProfileRelationBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title}({propriedades.items.length})
      </h2>

      <ul>
        {/*seguidores.map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={`https://github.com/${itemAtual}.png`}>
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>

            </li>
          )
        })} */}
      </ul>

    </ProfileRelationsBoxWrapper>
  )
};



export default function Home() {

  const usuarioAleatorio = 'cfcamargo';
  const [comunidades, setComunidades] = React.useState([]);
  //const comunidades = comunidades[0];
  //const alteradorDeComunidades/setComunidades = comunidades[1];

  //const comunidades = ['Alurakut'];
  const pessoasFavoritas = ['juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho']


  // 0 - pegar o array de dados do github
  const [seguidores, setSeguidores] = React.useState([])

  React.useEffect(function () {
    //GET
    fetch('https://api.github.com/users/peas/followers')
      .then(function (respostadoServidor) {
        return respostadoServidor.json();
      })
      .then(function (respostaCompleta) {
        setSeguidores(respostaCompleta);
      })

    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '5706a3ef1bbb8f5f85518e769c1aca',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "query": `query {
        allCommunities {
          title
          id
          imageUrl
          creatorSlug
        }
      }`})
    })

      .then((response) => response.json())

      .then((respostaCompleta) => {
        const comunidadesVindaDoDato = respostaCompleta.data.allCommunities;
        console.log(comunidades)
        setComunidades(comunidadesVindaDoDato)

      })

  }, [])

  return (
    <>

      <AlurakutMenu />

      <MainGrid>

        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>

            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet />

          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer ?</h2>

            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              //comunidades.push('AluraStars');
              const comunidade = {
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image'),
              }

              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas);

            }}>
              <div>
                <input
                  placeholder="Quai vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                  type="text"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>

          </Box>

        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

          <ProfileRelationBox title="Seguidores" items={seguidores} />

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades({comunidades.length})
            </h2>

            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/communities/${itemAtual.title}`}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>

                  </li>
                )
              })}
            </ul>

          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`}></img>
                      <span>{itemAtual}</span>
                    </a>

                  </li>

                )
              })}
            </ul>

          </ProfileRelationsBoxWrapper>


        </div>

      </MainGrid>

    </>
  )
}
