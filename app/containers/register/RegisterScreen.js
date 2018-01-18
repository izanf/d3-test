import React, { Component } from 'react';

// External components
import Cards from 'react-credit-cards';

// Custom components
import RegisterNav from './../../components/register/RegisterNav';
import { RegisterInput, RegisterSelect } from './../../components/shared/Inputs';
import { AlertIcon } from './../../components/shared/Icons';
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
      cardValid: false,
      installment: '',
      error: {
        cep: '',
        street: '',
        number: '',
        state: '',
        city: '',
        cardNumber: '',
        cardName: '',
        cardMonth: '',
        cardYear: '',
        cardCVV: ''
      },
      haveError: false
    };

    this.onChange = this.onChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.verifyErrors = this.verifyErrors.bind(this);
  }

  onChange(field, value) {
    const { dropdownVisible } = this.state;

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
        if (value.length < 4) this.setState({ cardCVV: maskNumber(value) });
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

  validateForm() {
    const {
      evenDelivery,
      cep,
      street,
      number,
      state,
      city,
      cardNumber,
      cardName,
      cardMonth,
      cardYear,
      cardCVV,
      cardValid
    } = this.state;
    let error = this.state.error;

    if (evenDelivery) {
      error.cep = false;
      error.street = false;
      error.number = false;
      error.state = false;
      error.city = false;
    } else {
      if (cep.length !== 9) error.cep = true;
      else error.cep = false;
      if (street.length < 4) error.street = true;
      else error.street = false;
      if (number.length < 1) error.number = true;
      else error.number = false;
      if (state.length === 0) error.state = true;
      else error.state = false;
      if (city.length === 0) error.city = true;
      else error.city = false;
    }

    if (!cardValid) error.cardNumber = true;
    else error.cardNumber = false;
    if (cardName.length === 0) error.cardName = true;
    else error.cardName = false;
    if (cardMonth.length < 2) error.cardMonth = true;
    else error.cardMonth = false;
    if (cardYear.length < 4) error.cardYear = true;
    else error.cardYear = false;
    if (cardCVV.length < 3) error.cardCVV = true;
    else error.cardCVV = false;

    this.setState({ error });

    this.verifyErrors();
  }

  verifyErrors() {
    const { error } = this.state;

    for (let key in error) {
      if (error[key] === true) {
        this.setState({ haveError: true });
        break;
      } else {
        this.setState({ haveError: false });
      }
    }

    this.setState({ error });
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
      installment,
      error,
      haveError
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
        <section className={`register-screen__error ${haveError ? '' : 'hidden'}`}>
          <h2><AlertIcon /> Preenchimento obrigatório</h2>
          <h1>Falha ao processar os dados do cartão</h1>
          <p>Verifique se as informações do seu cartão de crédito estão corretas (Nome, Número, Data de Validade, Código de Segurança).</p>
          <p>Se o problema persistir você pode usar outro cartão de crédito ou escolher como forma de pagamento o boleto bancário. Ou então, se preferir, entre em contato com seu banco ou administradora de cartão de crédito e tente realizar a compra novamente.</p>
        </section>
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
                  error={error.cep}
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
                  error={error.street}
                />
                <RegisterInput
                  label="Número"
                  name="number"
                  width="30%"
                  value={number}
                  onChange={value => this.onChange('number', value)}
                  error={error.number}
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
                  options={['SP', 'RJ', 'RN', 'SC', 'MG', 'RS']}
                  value={state}
                  onChange={value => this.onChange('state', value)}
                  onChangeDropdownVisible={value => this.onChange('dropdownVisible', value)}
                  error={error.state}
                />
                <RegisterSelect
                  label="Cidade"
                  name="city"
                  width="60%"
                  dropdownVisible={dropdownVisible}
                  options={['Natal', 'Parnamirim', 'Mossoró', 'Currais Novos', 'Apodi', 'Macau', 'Pipa']}
                  value={city}
                  onChange={value => this.onChange('city', value)}
                  onChangeDropdownVisible={value => this.onChange('dropdownVisible', value)}
                  error={error.city}
                />
              </div>
              <div className="form-section">
                <h1>Dados do cartão</h1>
                <div className="register-screen__card">
                  <Cards
                    number={cardNumber}
                    name={cardName}
                    expiry={`${cardMonth}/${cardYear}`}
                    cvc={cardCVV}
                    callback={(type, isValid) => this.setState({ cardValid: isValid })}
                  />
                </div>
                <RegisterInput
                  label="Número"
                  name="card-number"
                  width="45%"
                  placeholder="____ ____ ____ ____"
                  value={maskCardNumber(cardNumber)}
                  onChange={value => this.onChange('cardNumber', value)}
                  error={error.cardNumber}
                />
                <RegisterInput
                  label="Nome completo"
                  name="card-name"
                  width="55%"
                  value={cardName}
                  onChange={value => this.onChange('cardName', value)}
                  error={error.cardName}
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
                  error={error.cardMonth}
                />
                <RegisterSelect
                  name="card-year"
                  width="21%"
                  dropdownVisible={dropdownVisible}
                  options={['2018', '2019', '2020', '2021', '2022', '2023']}
                  value={cardYear}
                  onChange={value => this.onChange('cardYear', value)}
                  onChangeDropdownVisible={value => this.onChange('dropdownVisible', value)}
                  error={error.cardYear}
                />
                <RegisterInput
                  label="Código de segurança"
                  name="card-cvv"
                  width="50%"
                  value={cardCVV}
                  onChange={value => this.onChange('cardCVV', value)}
                  error={error.cardCVV}
                />
              </div>
              <div className="form-section">
                <h1>Valor e parcelamento</h1>
                <RegisterSelect
                  name="installment"
                  width="55%"
                  dropdownVisible={dropdownVisible}
                  options={[
                    maskPrice(price, 1),
                    maskPrice(price, 2),
                    maskPrice(price, 3),
                    maskPrice(price, 4),
                    maskPrice(price, 5)
                  ]}
                  value={installment}
                  onChange={value => this.onChange('installment', value)}
                  onChangeDropdownVisible={value => this.onChange('dropdownVisible', value)}
                />
              </div>
            </form>
            <div className="register-screen__buttons">
              <button className="btn btn-outline back">Voltar</button>
              <button className="btn btn-primary" onClick={() => this.validateForm()}>Finalizar compra</button>
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
