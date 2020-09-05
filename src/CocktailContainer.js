import { html, css, LitElement } from 'lit-element';
import '../node_modules/lit-cocktail/lit-cocktail.js';
import { DileModal } from '../node_modules/dile-modal/dile-modal.js';

export class CocktailContainer extends LitElement {
    static get styles() {
        return css `
      :host {
        display: flex;
        align-items: center;
        flex-direction: column;
        color: var(--cocktail-container-text-color, #000);
      }
      .principal {
        background-color: #C9ADA7;
      }
      .container-cocktail{
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 320px;
          height: 360px;
          position: relative;
          padding-top: 1em;
          margin-top: 55px;
          background: #22223b;
        }
        .container{
          display: flex;
          flex-direction: column;
          flex-flow: wrap;
          align-items: center;
          justify-content: space-between;
        }
        img {
          cursor: pointer;
        }
        h2 {
          text-align: center;
          font-family: cursive;
          font-size: 4em;
        }
        p {
          color: red;
        }
        p.NameContainer {
          color:white;
          font-weight: bold;
        }
        dile-modal p{
          font-weight: bold;
          color: black;
        }
        p.Name{
          font-weight: bold;
          color: black;
          font-size: 1.5em;
          text-align: center;
        }
    `;
    }

    static get properties() {
        return {
            data: { type: Array },
            itemModal: { type: Array }
        };
    }

    constructor() {
        super();
        this.data = [];
        this.itemModal = [];
    }
    render() {
            return html `
            <div class="principal">
                <h2>Cocktail APP</h2>
                <lit-cocktail @response=${(e) => this.data = e.detail}></lit-cocktail>
                <div class="container">
                  ${
                    this.data.map(item => html`
                      <div class="container-cocktail">
                        <img width="300em" src=${item.image}
                        @click="${() => {
                            this.itemModal = item;
                            this.shadowRoot.getElementById("modal").open();
                          }}" >
                        <p class="NameContainer">${item.name}</p>
                      </div>
                    `)
                  }
                </div>
              </div>
        <dile-modal id="modal">
          <img width="250em" src=${this.itemModal.image}>
          <p class="Name">${this.itemModal.name}</p>
          <p>Ingredients</p>
          <ul>
          ${this.itemModal.ingredients?.map((i) => html`${i ? html`<li>${i}</li>` : html``}`)}
          </ul>
          ${
            this.itemModal.preparation ? html`
              <p>Preparation</p>
              <label>${this.itemModal.preparation}</label>
            ` : html``
          }
        </dile-modal>
    `;
    }
}