<template>
    <div class="document-details">
        <h1>Detalles del documento</h1>
        <div class="participants">
        <h2>Participantes</h2>
        <p>En esta sección, puedes revisar el estatus actual de cada participante. También puedes verificar los RFCs de las personas que ya firmaron.</p>
        <div class="participant" v-for="participant in participants" :key="participant.id">
            <div class="status">
            <span class="signer">Firmante</span>
            <span class="name">{{ participant.name }}</span>
            <span class="signed" v-if="participant.signed">Firmado</span>
            </div>
            <div class="details">
            <div>RFC</div>
            <div>{{ participant.rfc }}</div>
            </div>
            <div class="details">
            <div>Método de firma utilizado:</div>
            <div>{{ participant.signatureMethod }}</div>
            </div>
        </div>
        </div>
        <div class="observers">
        <h2>Espectadores</h2>
        <p>Los espectadores serán notificados cada vez que alguien firme el documento y recibirán una copia cuando se reúnan todas las firmas.</p>
        </div>
    </div>
</template>

<script>
export default {
name: 'DocumentDetails',
    data() {
        return {
            participants: [
            {
                id: 1,
                name: 'Bruno Romero Pena',
                email: 'bruno.romero.pe17@gmail.com',
                rfc: 'BBBB020202BBB',
                signatureMethod: 'E.firma',
                signed: true
                }
            // ... other participants
        ]
    }
}
}
</script>

<style scoped>
.document-details {
  width: 100%;
  max-width: 600px;
  margin: auto;
  font-family: Arial, sans-serif;
}

.tabs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.tab {
  background-color: #f3f3f3;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.participants, .observers {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
}

.participant {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
}

.status {
  display: flex;
  align-items: center;
}

.signer {
  background-color: #e7f4e4;
  padding: 5px 10px;
  margin-right: 10px;
}

.name {
  margin-right: auto;
}

.signed {
  color: green;
}

.details {
  display: flex;
  justify-content: space-between;
}
</style>