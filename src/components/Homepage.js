import { React } from 'react';
import { useNavigate } from "react-router-dom";

import explorerImg from '../assets/img/explorer.jpg';

import schemaImg from '../assets/img/schema.jpg';
import cadenasImg from '../assets/img/cadenas.png';

import '../assets/css/global.css';
import '../assets/css/Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();

  //**** Buttons ****
  async function loadExplorer() {
    navigate("/explorer", { replace: true });
  }

  return (
    <div className="App Homepage">
      <header className="App-header Homepage-header">
        <div className="Homepage-header-title">Web3 Decentralized Disk</div>
        <div className="Homepage-header-subtitle">The most easy way to store any files on web3</div>
      </header>

      <div className="Homepage-detail">
        {/* left */}
        <div className="Homepage-detail-left">
          <div style={{padding: "10px 5px 10px 20px", textAlign: "left"}}>
            <div className="Homepage-detail-title">WELCOME TO THE ERA OF STORAGE 3.0</div>
            <div className="Homepage-detail-text">
              A decentralized storage solution based on Blockchain and ipfs, for security, preservation and online identification.
            </div>
          </div>
        </div>
        {/* right */}
        <div className="Homepage-detail-right">
          <img src={schemaImg} alt="" style={{maxHeight: "500px"}}></img>
        </div>
      </div>

      <div className="Homepage-detail">
        {/* left */}
        <div className="Homepage-detail-left">
          <img src={cadenasImg} alt="" style={{maxHeight: "500px"}}></img>
        </div>
        {/* right */}
        <div className="Homepage-detail-right">
          <div style={{padding: "10px 5px 10px 20px", textAlign: "left"}}>
            <div className="Homepage-detail-title">STORAGE 3.0</div>
            <div className="Homepage-detail-text">
              - Store for ever.<br/><br/>
              - Never lose your data.<br/><br/>
              - Protect about the ravages a hacker can make by encrypting your data.<br/><br/>
              - Nobody can modify or delete your data.
            </div>
          </div>
        </div>
      </div>

      <div className="Homepage-detail">
        {/* left */}
        <div className="Homepage-detail-left">
          <div style={{padding: "10px 5px 10px 20px", textAlign: "left"}}>
            <div className="Homepage-detail-title">EASY TO USE</div>
            <div className="Homepage-detail-text">
              - Use it like a hard disk<br/><br/>
              - Organise your datas by creating folders.<br/><br/>
              - Upload any file.<br/><br/>
              - Create links to existing ipfs files.
            </div>
          </div>
        </div>
        {/* right */}
        <div className="Homepage-detail-right">
          <img src={explorerImg} alt="" style={{maxHeight: "500px"}}></img>
        </div>
      </div>

      {/*<div className="Homepage-div-title Homepage-detail-title">
        <div style={{ backgroundColor: "aqua" }}>
          Data Access
        </div>

        <div className="Homepage-detail" style={{paddingLeft: "0px", marginTop: "10px"}}>

          <div className="Homepage-detail-four" style={{ marginRight: "10px" }}>
            <div>Explorer</div>
            <div className="Homepage-detail-text-four">With the Explorer, you can access to your data.</div>
          </div>
          <div className="Homepage-detail-four" style={{ marginRight: "10px" }}>
            <div>API</div>
            <div className="Homepage-detail-text-four">With the API, you can access to the data directly just like any other web link.
            You can use it for js, css, pictures, video, ...</div>
            <div className="Homepage-detail-text-four" style={{ alignItems: "end", display: "flex", height: "100%", marginBottom: "20px" }}>
              <span style={{ width: "100%", marginRight: "20px", textAlign: "right" }}>(comming soon)</span>
            </div>
          </div>
          <div className="Homepage-detail-four" style={{ marginRight: "10px" }}>
            <div>Classes</div>
            <div className="Homepage-detail-text-four">With the javascript classes, you can access to your disk on chain from your own UI.</div>
            <div className="Homepage-detail-text-four" style={{ alignItems: "end", display: "flex", height: "100%", marginBottom: "20px" }}>
              <span style={{ width: "100%", marginRight: "20px", textAlign: "right" }}>(comming soon)</span>
            </div>
          </div>
          <div className="Homepage-detail-four">
            <div>Library</div>
            <div className="Homepage-detail-text-four">With the solidity librairies, you can access to your disk on chain from your own contract.</div>
            <div className="Homepage-detail-text-four" style={{ alignItems: "end", display: "flex", height: "100%", marginBottom: "20px" }}>
              <span style={{ width: "100%", marginRight: "20px", textAlign: "right" }}>(comming soon)</span>
            </div>
          </div>

        </div>
      </div>*/}

      {/*<div className="Homepage-div-title Homepage-detail-title">
        <div style={{backgroundColor: "aquamarine"}}>
          Use Cases
        </div>

        <div className="Homepage-detail" style={{paddingLeft: "0px", marginTop: "10px", marginBottom: "20px"}}>
          <div className="Homepage-detail-one">
            <div className="Homepage-detail-text-four"><b>Personnal</b><br/>
            stockez des documents de tous types.<br/>
            - Creez les dossiers que vous désirez pour organiser vos fichiers.<br/>
            - Téléchargez sur ipfs, par l'explorateur, les fichiers que vous voulez ajouter à votre disque.<br/>
            - Creez un lien ipfs sur un fichier déjà existant sur ipfs.<br/><br/>
            N'oubliez pas que votre disque est accessible a tous. N'importe qui peut lire votre disque.<br/>
            <b>Attention:</b> ne mettez pas de documents personnel comme votre carte d'identité ou votre passport.<br/><br/>
            </div>
          </div>
        </div>

        <div className="Homepage-detail" style={{width: "100%", paddingLeft: "0px", marginTop: "10px", marginBottom: "20px"}}>
          <div className="Homepage-detail-one">
            <div className="Homepage-detail-text-four"><b>Company</b></div>
            <div className="Homepage-detail-text-four">
            stockez des documents de tous types.<br/>
            - Creez les dossiers que vous désirez pour organiser vos fichiers.<br/>
            - Téléchargez sur ipfs, par l'explorateur, les fichiers que vous voulez ajouter à votre disque : images, videos, documentations, ....<br/>
            - Creez un lien ipfs sur un fichier déjà existant sur ipfs.<br/><br/>
            Toute personne pourra acceder à vos documents <b>indéfiniment</b>.<br/>
            <b>Attention:</b> ne mettez pas de documents interne à l'entreprise.<br/><br/>
            </div>
          </div>
        </div>

        <div className="Homepage-detail" style={{width: "100%", paddingLeft: "0px", marginTop: "10px", marginBottom: "20px"}}>
          <div className="Homepage-detail-one">
            <div className="Homepage-detail-text-four"><b>Web2 to Web3</b></div>
            <div className="Homepage-detail-text-four">
            (web galerie) Avant, il fallait ouvrir un acces ftp ou une page web d'upload a vos utilisateurs pour qu'ils puissent
            mettre leurs images, videos, textes ou autre sur votre serveur. Ainsi qu'une page de login avec une fonction "password lost".<br/>
Cet acces pouvait etre une source de piratage, d'ou la necessité de faire des mises à jour, surveiller les attaques, ...<br/>
Il etait aussi de votre responsabilité de gérer les mot de passe et donc de vous conformer a la loi en vigueur dans chaque pays.<br/>
Vous deviez posséder de gros disques sécurisés pour le stokage de tous les fichiers de tous vos utilisateurs.<br/>
<br/>
<u>Il vous fallait :</u><br/>
- un serveur pour votre site web<br/>
- un acces a votre disque par page d'upload, ftp, ...<br/>
- gros disque sécurisé pour le stokage de tous les fichiers de tous vos utilisateurs.<br/>
- base de données utilisateurs (user/password)<br/>
- access management (ajout, suppression d'utilisateur, ...).<br/>
<br/>
<br/>
Avec le Web3, <b>oubliez tout cela</b>.<br/>
Vos utilisateurs ouvrent leur disque auquel seul eux peuvent avoir acces.<br/>
Il vous donne l'adresse de leur disque ainsi le dossier des fichiers.<br/>
Vous n'avez plus qu'a lire le dossier pour obtenir les liens ipfs et les afficher.<br/><br/>
<u>Il vous faut :</u><br/>
- un serveur pour votre site web.<br/>
- ajouter les classes javascript a votre site web.<br/>
<b>Et c'est tout.</b><br/>
<br/>
- les utilisateurs n'ont plus acces a votre disque<br/>
- no access management (user/password) : l'acces se fait par le wallet de l'utilisateur sur son propre disk on chain.<br/>
- no disk (les données sont sur leur disque on chain et ipfs)<br/>
<br/>
<b>More secure, less work !</b><br/><br/></div>
          </div>
        </div>

      <div className="Homepage-detail" style={{width: "100%", paddingLeft: "0px", marginTop: "0px"}}>
          <div className="Homepage-detail-one">
            <div className="Homepage-detail-text-four"><b>With contract</b></div>
            <div className="Homepage-detail-text-four">
            - Ajouter les librairies solidity a votre DAO.<br/>
            - Creez un disque puis changez l'ownership par l'adresse de votre DAO, votre DAO sera alors le seul a pouvoir ecrire sur le disque.<br/>
            - Creez le dossier que vous désirez depuis votre DAO via une proposition.<br/>
            - Télécharger sur ipfs le fichier que vous voulez ajouter à votre disque puis creez une proposition d'ajout du lien ipfs au disque.<br/>
            - Votez l'ajout du dossier ou du lien ipfs depuis votre DAO.<br/>
            - Executez la fonction d'ajout du dossier ou du lien ipfs sur le disque depuis votre DAO.<br/><br/>
            Tout écriture sur le disque (creation de dossier ou ajout de lien ipfs) est lié a un vote.<br/><br/>
            </div>
          </div>
      </div>
    </div>*/}

      <div id="footer" className="Homepage" style={{paddingBottom: "50px"}}>
        <button className="App-button Homepage-button" style={{marginRight: "25px"}} onClick={() => loadExplorer()}>Try the Demo</button>
      </div>

    </div>
  );
};

export default Homepage;

