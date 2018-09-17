using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactCare.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ContactCare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class contactController : ControllerBase
    {
        private ContactDbContext _context;

        public contactController(ContactDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public List<Contact> Getcontacts()
        {
            return _context.Contacts.ToList();
        }

        [HttpGet("{id}", Name = "contact")]
        public IActionResult GetContactById(int id)
        {
            var contact = _context.Contacts.Find(id);
            if (contact == null)
            {
                return NotFound();
            }

            return Ok(contact);
        }
        [HttpPost]
        public IActionResult CreateContact([FromBody] Contact contact)
        {
            if (contact == null)
            {
                return BadRequest();
            }

            _context.Contacts.Add(contact);
            _context.SaveChanges();
            return CreatedAtRoute("contact", new { id = contact.Id }, contact);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateContact(int id, [FromBody] Contact contact)
        {
            if (contact == null || id != contact.Id)
            {
                return BadRequest();
            }
            _context.Entry(contact).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();
            return Ok("Updated Successfully");
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteContact(int id)
        {
            var contact = _context.Contacts.Find(id);
            if (id != contact.Id)
            {
                return BadRequest();
            }
            _context.Contacts.Remove(contact);
            _context.SaveChanges();
            return Ok("Deleted Successfully");   
        }
    }
}