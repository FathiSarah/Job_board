<template>
     <div>
       <h1>Admin Page</h1>
       <div v-for="(table, index) in tables" :key="index" class="table-container">
         <h2>{{ table.name }}</h2>
         <table>
           <thead>
             <tr>
               <th v-for="(header, index) in table.headers" :key="index">{{ header }}</th>
               <th>Actions</th>
             </tr>
           </thead>
           <tbody>
             <tr v-for="(row, rowIndex) in table.data" :key="rowIndex">
               <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                 <input v-model="row[cellIndex]" />
               </td>
               <td>
                 <button @click="updateRow(table.name, row)">Update</button>
               </td>
             </tr>
           </tbody>
         </table>
       </div>
     </div>
   </template>
   
   <script>
   export default {
     name: 'AdminPage',
     data() {
       return {
         tables: [],
       };
     },
     async mounted() {
       await this.fetchTables();
     },
     methods: {
       async fetchTables() {
         const response = await fetch('YOUR_API_ENDPOINT');
         this.tables = await response.json();
       },
       async updateRow(tableName, row) {
         const response = await fetch(`YOUR_API_ENDPOINT/${tableName}`, {
           method: 'PUT',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(row),
         });
         if (response.ok) {
           console.log(`Row updated successfully in ${tableName}`);
         } else {
           console.error('Error updating row:', response);
         }
       },
     },
   };
   </script>
   
   <style scoped>
   /* Add your styles here */
   .table-container {
     margin-bottom: 20px;
   }
   table {
     width: 100%;
     border-collapse: collapse;
   }
   th, td {
     border: 1px solid #ccc;
     padding: 8px;
     text-align: left;
   }
   input {
     width: 100%;
     box-sizing: border-box;
   }
   </style>
   