export default class Service {
  getResource = async url => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };

  getTickets = async url => {
    const res = await this.getResource(url);
    return res.tickets;
  };
}
