using AutoMapper;
using MicroS_Common.Handlers;
using MicroS_Common.RabbitMq;
using MicroS_Common.Types;
using MicroS_Common.Mongo;
using System;
using System.Threading.Tasks;
using <%=appname%>.domain.<%= domain %>s.Domain;
using <%=appname%>.domain.<%= domain %>s.Messages.Commands;
using <%=appname%>.domain.<%= domain %>s.Messages.Events;
using <%=service.name%>.Repositories;

/// <summary>
/// This file was generated by the yeoman generator "generator-micros"
/// @author: <%=author.name%>
/// @email: <%=author.email%>
/// @created_on: <%= new Date()%>
/// </summary>
namespace <%=service.name%>.Handlers
{
    /// <summary>
    /// Delete <%= pascalDomain %> Handler
    /// </summary>
    public partial class Create<%= pascalDomain %>Handler : DomainCommandHandler<Create<%= pascalDomain %>,<%= pascalDomain %>>
    {
        

        #region Constructors
        public Create<%= pascalDomain %>Handler(
            IBrowse<%= pascalDomain %>Repository repository,
            IBusPublisher busPublisher,
            IMapper mapper):base(busPublisher,mapper,repository){}
        #endregion

        #region Protected Overrides functions
        /// <summary>
        /// Check if the model exist by Command
        /// </summary>
        /// <param name="command">The command in wich information can be use do check if the model exist in database</param>
        /// <returns>Nothing</returns>
        protected override async Task<bool> CheckExist(Guid id)
        {
            if (await base.CheckExist(id))
            {
                throw new MicroSException("<%= domain %>_already_exists",$"<%= pascalDomain %>: '{id}' already exists.");
            }
           return true;
        }
        #endregion

        #region Public Overrides functions
        /// <summary>
        ///  Handle the command with context
        /// </summary>
        /// <param name="command">The command to handle</param>
        /// <param name="context">The correlation context</param>
        /// <returns></returns>
        public override async Task HandleAsync(Create<%= pascalDomain %> command, ICorrelationContext context)
        {

            await base.HandleAsync(command, context);

            var product = GetDomainObject(command);
            
            await Repository.AddAsync(product);

            await BusPublisher.PublishAsync(CreateEvent<<%= pascalDomain %>Created>(command), context);
        }
        #endregion
    }
}
