module.exports = {
	// Alternative connection strings for fallback
	// dbconnection:'mongodb://poenghskcdj:2sEHdke3eDi83K0ds@172.232.73.254:34256/peijdnrnsajr',
	// dbconnection:'mongodb://poenghskcdj:2sEHdke3eDi83K0ds@13.233.159.124:34256/peijdnrnsajr',
	
	// Primary MongoDB Atlas connection
	dbconnection: 'mongodb+srv://wgdc:DNSzOlW4n6UaaVW8@cluster1bulana.mv49q.mongodb.net/db?retryWrites=true&w=majority',
	
	// Fallback connections (uncomment if primary fails)
	// dbconnection: 'mongodb://poenghskcdj:2sEHdke3eDi83K0ds@172.232.73.254:34256/peijdnrnsajr',
}