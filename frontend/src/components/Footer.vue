<template>
     <div>
         <div class="footer-fixed d-flex align-center justify-space-between primary pa-2">
             <v-btn
                 v-for="(link, index) in links"
                 :key="index"
                 class="white--text "
                 text
                 :to="{name:link.to}"
             >
                 <v-icon flat size="24px">
                     {{ link.icon }}
                 </v-icon>
             </v-btn>
    
             
         </div>
     </div>
</template>

<script>
export default {
    props:{
        links:{
        
        }
    },
    name: "Footer"
}
</script>

<style scoped>
    

    .v-btn--active{
        box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12) !important;
    }
    
    .footer-fixed{
        position: fixed;
        bottom: 0;
        width: 100%;
    }
</style>