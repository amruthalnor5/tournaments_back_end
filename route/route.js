const tournaments = require('../app/tournaments')
function init(app) {
 const path = '/tournaments';

 app.get(path+'/getContractApi', tournaments.getContractApi);
 app.get(path+'/getSingleTournament',tournaments.getSingleTournament);
 app.get(path+'/getActiveTournaments',tournaments.getActiveTournaments);
 app.get(path+'/getOngoingTournaments',tournaments.getOngoingTournaments);
 app.get(path+'/getTourParticipants',tournaments.getTourParticipants);
 app.get(path+'/getLeaderboard',tournaments.getLeaderboard);
}
module.exports = init;