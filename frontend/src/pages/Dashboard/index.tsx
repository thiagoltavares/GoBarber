import React, { useState, useCallback } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FiPower, FiLock } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointment,
  Section,
  Appointment,
} from './styles';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { signOut, user } = useAuth();

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="gobarber" />

          <Profile>
            <img src={user.avatar_url} alt="avatar" />
            <div>
              <span>Welcome,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários Agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda Feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars3.githubusercontent.com/u/43707021?s=460&u=01d71a26945e6fb6542ae3ca0e8f3a9c5922b70f&v=4"
                alt="thiago tavares"
              />
              <strong>Thiago tavares</strong>
              <span>
                <FiLock />
                8:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiLock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars3.githubusercontent.com/u/43707021?s=460&u=01d71a26945e6fb6542ae3ca0e8f3a9c5922b70f&v=4"
                  alt="thiago tavares"
                />
                <strong>Thiago tavares</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiLock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars3.githubusercontent.com/u/43707021?s=460&u=01d71a26945e6fb6542ae3ca0e8f3a9c5922b70f&v=4"
                  alt="thiago tavares"
                />
                <strong>Thiago tavares</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiLock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars3.githubusercontent.com/u/43707021?s=460&u=01d71a26945e6fb6542ae3ca0e8f3a9c5922b70f&v=4"
                  alt="thiago tavares"
                />
                <strong>Thiago tavares</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }]}
            modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
            onDayClick={handleDateChange}
            selectedDays={selectedDate}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
