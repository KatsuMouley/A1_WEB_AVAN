using System;

using api_avaliacao.Data;
using api_avaliacao.Data.Interfaces;
using api_avaliacao.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api_avaliacao.Controllers;


[ApiController]
[Authorize]
[Route("api/comentarios")]
public class ComentarioController : ControllerBase
{
    private readonly AppDataContext context;
    public ComentarioController(AppDataContext _context)
    {
        context = _context;
    }

    [HttpPost("comentar")]
    [Authorize]
    public IActionResult Comentar([FromBody] Comentario comentario)
    {
        context.Comentarios.Add(comentario);
        context.SaveChanges();
        return Created("", comentario);
    }


    [HttpGet("listar")]
    [Authorize]
    public IActionResult Listar()
    {
        return Ok(context.Comentarios.ToList());
    }

    [HttpGet("listar/item/{id}")]
    [Authorize]
    public IActionResult ListarItem(int id)
    {
        return Ok(context.Comentarios.Where(p => p.ItemId == id).ToList());
    }

    
    [HttpGet("listar/categoria/{id}")]
    [Authorize]
    public IActionResult pegarCategoria(int id)
    {
        return Ok(context.Categorias.FirstOrDefault(p => p.CategoriaId == id));
    }



    [HttpDelete("delete/{id}")]
    [Authorize]
    public IActionResult Delete(int id)
    {
        var comentario = context.Comentarios.FirstOrDefault(p => p.ComentarioId == id);
        if (comentario == null)
        {
            return NotFound("Comentario não encontrado.");
        }
        context.Comentarios.Remove(comentario);
        context.SaveChanges();
        return Ok();
    }
    
}