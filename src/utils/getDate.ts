export function getDate(date = '') {
  if (date) {
    const data: Date = new Date(date);
    const dia = data.getUTCDate();
    const mes = data.getUTCMonth() + 1;
    const ano = data.getUTCFullYear();
    const hora = data.getUTCHours();
    const min = data.getUTCMinutes();
    const seg = data.getUTCSeconds();
    return `${dia}/${mes}/${ano} ${hora}:${min}:${seg}`
  }
  const data: Date = new Date();
  const dia = data.getUTCDate();
  const mes = data.getUTCMonth() + 1;
  const ano = data.getUTCFullYear();
  const hora = data.getHours();
  const min = data.getUTCMinutes();
  const seg = data.getUTCSeconds();
  return `${dia}/${mes}/${ano} ${hora}:${min}:${seg}`
}

export function isAfter(dataAtual, prazo) {
  const now: Date = new Date(dataAtual);
  const deadline = new Date(prazo);
  return now > deadline;
}