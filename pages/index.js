import MainGrid from '../src/componentes/MainGrid'
import Box from '../src/componentes/Box'
import {AlurakutMenu, OrkutNostalgicIconSet} from '../src/lib/AluraCommons';
import {ProfileRelationsBoxWrapper} from '../src/componentes/ProfileRelations';

// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `

function ProfileSidebar(propriedades){
  return (

      <Box >
        <img src={`https://github.com/${propriedades.githubUser}.png`} style={{borderRadius: '8px'}}/> 
      </Box>
  )
}



export default function Home() {

  const githubUser = 'cfcamargo';
  const pessoasFavoritas = ['juunegreiros', 
                            'omariosouto', 
                            'peas', 
                            'rafaballerini',
                            'marcobrunodev',
                            'felipefialho']

  return (
    <>    

      <AlurakutMenu />

      <MainGrid>

        <div className = "profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser = {githubUser}/>
        </div>

        <div className = "welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box>

            <h1 className = "title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet />

          </Box>
        </div>

        <div className = "profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`}></img>
                      <span>{itemAtual}</span>
                    </a> 

                  </li>

                )
              })}
              </ul>

          </ProfileRelationsBoxWrapper>
          
          <Box>
            <h2>
              Comunidades
            </h2>
              
          </Box>
        </div>

      </MainGrid>

    </>
  )
}
