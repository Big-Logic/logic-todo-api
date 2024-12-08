import supabase from "./supabase.config.mjs";

const getAll = async function () {
    const { data: tasks, error } = await supabase
        .from('tasks')
        .select('*')
    
    console.log(tasks, tasks)
}

getAll();