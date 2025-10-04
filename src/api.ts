// const graphql_endpoint1 = 'https://gis-api.aiesec.org/graphql';
// const perPage = 1000;

// var requestHeaders = {
//         'Content-Type': 'application/json',
//         'Authorization': '4fwM3iqTizYG_WWnzXOA5nuuUwwNnxeGd2unjQO85fQ	', //token
//       };

// function query(){
//   var page = 1;
//   var allOpportunities = [];
//   while(true){
//     var query = `{
//       opportunities(filters: {
//       status: "open",
//       committee: 1623
//     }) {
//     data {
//       id 
//       title
//       status
//       programmes { short_name_display }
//       openings
//       home_lc { name }
   
//       slots{
//         title
//         start_date
//         end_date
//         openings
//       }

//     }
//       paging {
//         total_pages
//         current_page
//       }
//   }
// }`
   
//     try {
//       var response = UrlFetchApp.fetch(graphql_endpoint1, {
//         method: 'post',
//         headers: requestHeaders,
//         // payload: JSON.stringify({ query, variables }),
//         payload: JSON.stringify({ query }),
//         muteHttpExceptions: true
//       });

//       catch (error) {
//       Logger.log("Error fetching applications: " + error);
//       break;
//       }
//     }
//   // Logger.log(allOpportunities)
//   return allOpportunities;
// } if (response.getResponseCode() !== 200) {
//         Logger.log(response);
//         Logger.log("GraphQL request failed: " + response.getResponseCode());
//         break;
//       }

//       Logger.log(response)
//       Logger.log("-----Fetching Data----->>")

//       var data = JSON.parse(response.getContentText());
//       var opportunities_ = data.data.allOpportunity.data || [];
//       allOpportunities = allOpportunities.concat(opportunities_);

//       if (data.data.allOpportunity.paging.current_page >= data.data.allOpportunity.paging.total_pages) {
//         break;
//       }
//       page++;

//     }