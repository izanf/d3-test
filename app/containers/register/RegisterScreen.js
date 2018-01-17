import React, { Component } from 'react';

// Custom components
import RegisterNav from './../../components/register/RegisterNav';
import RegisterInput from './../../components/register/RegisterInput';
import RegisterSelect from './../../components/register/RegisterSelect';
import {
  maskCep,
  maskCardNumber,
  maskNumber,
  maskPrice
} from './../../utils/masks';


class RegisterScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navSelected: 4,
      dropdownVisible: '',
      evenDelivery: false,
      cep: '',
      street: '',
      number: '',
      complement: '',
      state: '',
      city: '',
      cardNumber: '',
      cardName: '',
      cardMonth: '',
      cardYear: '',
      cardCVV: '',
      installment: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(field, value) {
    const { dropdownVisible } = this.state;
    console.log(field, value);

    switch (field) {
      case 'cep':
        if (value.length < 10) {
          this.setState({ cep: maskCep(value) });
        }
        break;

      case 'number':
      case 'cardYear':
        this.setState({ [field]: maskNumber(value) });
        break;

      case 'cardNumber':
        if (value.length < 20) this.setState({ cardNumber: value });
        break;

      case 'cardCVV':
        if (value.length < 4) this.setState({ cardCVV: value });
        break;

      case 'dropdownVisible':
        if (dropdownVisible === '') {
          this.setState({ dropdownVisible: value });
        } else {
          this.setState({ dropdownVisible: '' });
        }
        break;

      default:
        if (!'') {
          this.setState({ [field]: value });
        }
        break;
    }
  }

  render() {
    const {
      navSelected,
      dropdownVisible,
      evenDelivery,
      cep,
      street,
      number,
      complement,
      state,
      city,
      cardNumber,
      cardName,
      cardMonth,
      cardYear,
      cardCVV,
      installment
    } = this.state;

    const price = 4231;

    return (
      <div className="register-screen">
        <header>
          <h2>EXP_</h2>
          <h1>Cadastro</h1>
          <h2>Karol com 5K_</h2>
        </header>
        <RegisterNav selected={navSelected} />
        <aside>
          <section className="register-screen__payment">
            <div className="section-title">
              <h1>Pagamento</h1>
            </div>
            <form>
              <div className="form-section">
                <h1>Endereço de cobrança</h1>
                <div className="register-screen__buttons billing-address">
                  <button
                    className={`btn ${evenDelivery ? 'btn-primary' : 'btn-outline'}`}
                    onClick={e => {
                      e.preventDefault();
                      this.onChange('evenDelivery', true);
                    }}
                  >É o mesmo da entrega</button>
                  <button
                    className={`btn ${!evenDelivery ? 'btn-primary' : 'btn-outline'}`}
                    onClick={e => {
                      e.preventDefault();
                      this.onChange('evenDelivery', false);
                    }}
                  >É diferente da entrega</button>
                </div>
              </div>
              <div className={`form-section ${evenDelivery ? ' hidden' : ''}`}>
                <h1>Qual o seu CEP de cobrança?</h1>
                <RegisterInput
                  label="CEP"
                  name="cep"
                  width="70%"
                  placeholder="_____-___"
                  value={cep}
                  onChange={value => this.onChange('cep', value)}
                >
                  <button>Não sei meu CEP</button>
                </RegisterInput>
              </div>
              <div className={`form-section ${evenDelivery ? ' hidden' : ''}`}>
                <h1>Confirme seu endereço de cobrança</h1>
                <RegisterInput
                  label="Logradouro"
                  name="street"
                  width="70%"
                  value={street}
                  onChange={value => this.onChange('street', value)}
                />
                <RegisterInput
                  label="Número"
                  name="number"
                  width="30%"
                  value={number}
                  onChange={value => this.onChange('number', value)}
                />
                <RegisterInput
                  label="Complemento"
                  name="complement"
                  width="80%"
                  value={complement}
                  onChange={value => this.onChange('complement', value)}
                />
                <RegisterSelect
                  label="UF"
                  name="state"
                  width="20%"
                  dropdownVisible={dropdownVisible}
                  options={['SP', 'RJ', 'RN']}
                  value={state}
                  onChange={value => this.onChange('state', value)}
                  onChangeDropdownVisible={value => this.onChange('dropdownVisible', value)}
                />
                <RegisterSelect
                  label="Cidade"
                  name="city"
                  width="60%"
                  dropdownVisible={dropdownVisible}
                  options={['Natal', 'Parnamirim', 'Mossoró']}
                  value={city}
                  onChange={value => this.onChange('city', value)}
                  onChangeDropdownVisible={value => this.onChange('dropdownVisible', value)}
                />
              </div>
              <div className="form-section">
                <h1>Dados do cartão</h1>
                <RegisterInput
                  label="Número"
                  name="card-number"
                  width="45%"
                  placeholder="____ ____ ____ ____"
                  value={maskCardNumber(cardNumber)}
                  onChange={value => this.onChange('cardNumber', value)}
                />
                <RegisterInput
                  label="Nome completo"
                  name="card-name"
                  width="55%"
                  value={cardName}
                  onChange={value => this.onChange('cardName', value)}
                />
                <RegisterSelect
                  label="Validade"
                  name="card-month"
                  width="29%"
                  dropdownVisible={dropdownVisible}
                  options={['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']}
                  value={cardMonth}
                  onChange={value => this.onChange('cardMonth', value)}
                  onChangeDropdownVisible={value => this.onChange('dropdownVisible', value)}
                />
                <RegisterSelect
                  name="card-year"
                  width="21%"
                  dropdownVisible={dropdownVisible}
                  options={['2018', '2019', '2020', '2021', '2022', '2023']}
                  value={cardYear}
                  onChange={value => this.onChange('cardYear', value)}
                  onChangeDropdownVisible={value => this.onChange('dropdownVisible', value)}
                />
                <RegisterInput
                  label="Código de segurança"
                  name="card-cvv"
                  width="50%"
                  value={cardCVV}
                  onChange={value => this.onChange('cardCVV', value)}
                />
              </div>
              <div className="form-section">
                <h1>Valor e parcelamento</h1>
                <RegisterSelect
                  name="installment"
                  width="55%"
                  dropdownVisible={dropdownVisible}
                  options={[maskPrice(price, 1), maskPrice(price, 2), maskPrice(price, 3)]}
                  value={installment}
                  onChange={value => this.onChange('installment', value)}
                  onChangeDropdownVisible={value => this.onChange('dropdownVisible', value)}
                />
              </div>
            </form>
            <div className="register-screen__buttons">
              <button className="btn btn-outline back">Voltar</button>
              <button className="btn btn-primary">Finalizar compra</button>
            </div>
          </section>
          <section className="register-screen__purchase-details">
            <div className="section-title">
              <h1>Detalhes da compra</h1>
            </div>
            <p className="price">R$ 660,00 <span>em até 5x</span></p>
            <h2>Você terá direito a:</h2>
            <ul>
              <li><strong>01</strong> tênis especial para corrida</li>
              <li><strong>05</strong> peças de vestuário para você correr melhor</li>
              <li><strong>05</strong> acessórios para ajudar no seu desempenho</li>
              <li>Acompanhamento personalizado de profissionais de treino</li>
              <li>Apoio com dicas de nutrição</li>
              <li>Acesso exclusivo ao conteúdo do app <strong>EXP_</strong></li>
            </ul>
          </section>
        </aside>
        <footer>
          <h1>EXP_</h1>
          <h1>Karol com 5K_</h1>
        </footer>
      </div>
    );
  }
}

export default RegisterScreen;
