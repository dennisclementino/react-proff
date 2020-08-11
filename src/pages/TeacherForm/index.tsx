import React ,{ useState, FormEvent}from 'react';
import PageHeader from '../../components/PageHeader';
import { useHistory } from 'react-router-dom';

import'./styles.css';
import Input from '../../components/Input';

import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherForm(){

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    {week_day:0,from:'',to:''}
  ]);

  const history = useHistory();

  function addNewScheduleItem(){

    setScheduleItems([
      ...scheduleItems,{week_day:0,from:'',to:''}
    ]);

  }

  function handleCreateClass(e: FormEvent){

    e.preventDefault();

    api.post('classes',{
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule : scheduleItems
    }).then(()=>{
      
      alert('Cadastro realizado com sucesso!');

      history.push('/');

    }).catch(()=>{
      alert('Erro no cadastro!');
    });

    
  }

  function setScheduleItemsValue(position:number,field:string, value:string){
    const updateScheduleItems = scheduleItems.map((scheduleItems,index) =>{
      if(index === position){
        return {...scheduleItems, [field]:value };
      }

      return scheduleItems;

    });

    setScheduleItems(updateScheduleItems);

  }


  return (
    <div id="page-teacher-form" className="container">

      
      <PageHeader 
        title="Que incrível que você quer da aulas"
        description = "O primeiro  parro é preencher esse formuário de inscrição"
      ></PageHeader>

      <main>
        <form onSubmit={handleCreateClass}>
        <fieldset>
          <legend>Seus dados</legend>

          <Input name="name" label="Nome Completo" value={name} onChange={(e)=>{ setName(e.target.value) }}/>

          <Input name="avatar" label="Avatar" value={avatar} onChange={(e)=>{ setAvatar(e.target.value) }}/>
          
          <Input name="whatsapp" label="Whatsapp" value={whatsapp} onChange={(e)=>{ setWhatsapp(e.target.value) }}/>

          <Textarea name="bio" label="Biografia" value={bio} onChange={(e)=>{ setBio(e.target.value) }}/>

        </fieldset>  

        <fieldset>
          <legend>Sobre a aula</legend>

          <Select 
          name="subject" label="Matéria"
          options={[
            {value:'Artes', label:'Artes'},
            {value:'Biologia', label:'Biologia'},
            {value:'Ciencias', label:'Ciencias'},
            {value:'Fisica', label:'Fisica'},
            {value:'Portugûes', label:'Portugûes'}
          ]}
          value={subject} onChange={(e)=>{ setSubject(e.target.value) }}
          />

          <Input name="cost" label="Custo da sua hora por aula" value={cost} onChange={(e)=>{ setCost(e.target.value) }}/>

        </fieldset>  


        <fieldset>
          <legend>Horários disponíveis
            <button type='button' onClick={addNewScheduleItem}>+ Novo horário</button>
          </legend>

          {scheduleItems.map((scheduleItems, index) => {
            return(

              <div key={index} className="schedule-item">

              <Select
                name="week_day" label="Dia da Semana"
                value = {scheduleItems.week_day}
                onChange={e => setScheduleItemsValue(index,'week_day', e.target.value )}
                options={[
                  {value:'0', label:'Domingo'},
                  {value:'1', label:'Segunda-Feira'},
                  {value:'2', label:'Terça-Feira'},
                  {value:'3', label:'Quarta-Feira'},
                  {value:'4', label:'Quinta-Feira'},
                  {value:'5', label:'Sexta-Feira'},
                  {value:'6', label:'Sábado'}
                ]}
              />

              <Input name="from" label="Das" type="time" value = {scheduleItems.from} onChange={e => setScheduleItemsValue(index,'from', e.target.value )}/>
              <Input name="to" label="Até" type="time" value = {scheduleItems.to} onChange={e => setScheduleItemsValue(index,'to', e.target.value )} />

              </div>

            );
          })}

        </fieldset>  

        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante"/>
            Importante! <br/>
            Preehcar todos os dados
          </p>

          <button type="submit">
          Salvar cadastro
        </button>


        </footer>

        </form>
      </main>

    </div>
  )
}

export default TeacherForm;